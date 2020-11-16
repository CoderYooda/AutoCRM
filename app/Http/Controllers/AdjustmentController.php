<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdjustmentRequest;
use App\Http\Requests\Adjustments\SearchRequest;
use App\Models\Adjustment;
use App\Models\Article;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use Auth;

class AdjustmentController extends Controller
{
    public static function adjustmentDialog(Request $request)
    {
        $adjustment = Adjustment::find($request->adjustment_id);

        $tag = 'adjustmentDialog' . ($adjustment->id ?? '');

        $articles = [];

        if ($adjustment) {

            $adjustmentArticleEntrances = DB::table('adjustment_article_entrance')->where('adjustment_id', $adjustment->id)->get();
            $articleEntrances = DB::table('article_entrance')->whereIn('id', $adjustmentArticleEntrances->pluck('article_entrance_id'))->get();

            $articleNames = Article::with('supplier')->whereIn('id', $articleEntrances->pluck('article_id'))->get();

            foreach ($articleEntrances as $articleEntrance) {

                $article_id = $articleEntrance->article_id;
                $adjustmentArticleEntrance = $adjustmentArticleEntrances->where('article_entrance_id', $articleEntrance->id)->first();

                $articles[$article_id]['name'] = $articleNames->find($article_id)->name;
                $articles[$article_id]['article'] = $articleNames->find($article_id)->article;
                $articles[$article_id]['manufacturer'] = $articleNames->find($article_id)->supplier->name;

                $articles[$article_id]['entrances'][$articleEntrance->id] = [
                    'id'              => $articleEntrance->id,
                    'created_at'      => date('d.m.Y', strtotime($articleEntrance->created_at)),
                    'deviation_price' => $adjustmentArticleEntrance->price,
                    'deviation_count' => $adjustmentArticleEntrance->count,
                    'price'           => $articleEntrance->price,
                    'count'           => $articleEntrance->count,
                    'released_count'  => $articleEntrance->released_count
                ];
            }
        }

        $view = view(get_template() . '.adjustments.dialog.form_adjustment', compact('adjustment', 'request', 'articles'))
            ->with('class', $tag);

        return response()->json([
            'tag'  => $tag,
            'html' => $view->render()
        ]);
    }

    public function search(SearchRequest $request)
    {
        $class = $request->refer;

        $article = Article::find($request->product_id);

        $company = Auth::user()->company;

        $articleEntrances = DB::table('article_entrance')
            ->whereRaw('released_count < count')
            ->where([
                'company_id' => $company->id,
                'article_id' => $article->id
            ])
            ->get();

        $articleAttributes = [
            'name'         => $article->name,
            'manufacturer' => $article->supplier->name,
            'article' => $article->article,
            'entrances'    => []
        ];

        foreach ($articleEntrances as $articleEntrance) {

            if($articleEntrance->count == $articleEntrance->released_count) continue;

            $articleAttributes['entrances'][$articleEntrance->id] = [
                'id'             => $articleEntrance->id,
                'created_at'     => date('d.m.Y', strtotime($articleEntrance->created_at)),
                'count'          => $articleEntrance->count,
                'price'          => $articleEntrance->price,
                'released_count' => $articleEntrance->released_count
            ];
        }

        $view = view(get_template() . '.adjustments.dialog.includes.product_element', compact('class', 'articleAttributes'))
            ->with('article_id', $article->id);

        return response()->json([
            'html'    => $view->render(),
            'article' => $article
        ]);
    }

    public function tableData(Request $request)
    {
        $adjustments = AdjustmentController::getAdjustments($request);
        return response()->json(['data' => $adjustments]);
    }

    public function store(AdjustmentRequest $request)
    {
        return DB::transaction(function () use ($request) {

            $user = Auth::user();
            $partner = Auth::user()->partner;

            $adjustment = Adjustment::create([
                'company_id' => $partner->company_id,
                'manager_id' => $partner->id,
                'store_id'   => $user->current_store,
                'comment'    => $request->comment
            ]);

            foreach ($request->products as $entrance_id => $articles) {

                foreach ($articles as $article_id => $params) {

                    $query = DB::table('article_entrance');

                    $articleEntranceId = $entrance_id;

                    if ($articleEntranceId == 'new') {

                        if($params['count'] == 0) continue;

                        $attributes = [
                            'entrance_id' => null,
                            'article_id'  => $article_id,
                            'company_id'  => $partner->company_id,
                            'store_id'    => $user->current_store,
                            'price'       => $params['price'],
                            'count'       => $params['count'],
                            'created_at'  => Carbon::now(),
                            'updated_at'  => Carbon::now()
                        ];

                        $articleEntranceId = $query->insertGetId($attributes);
                    }

                    $articleEntrance = DB::table('article_entrance')->find($articleEntranceId);

                    if($entrance_id != 'new') {
                        $query->where('id', $entrance_id)->update([
                            'count' => ($articleEntrance->released_count + $params['count']),
                            'price' => $params['price'],
                            'updated_at' => Carbon::now()
                        ]);
                    }

//                    dd($articleEntrance->count, $articleEntrance->released_count,  $params['count'], (($articleEntrance->count - $articleEntrance->released_count) + $params['count']));

                    DB::table('adjustment_article_entrance')->insertOrIgnore([
                        'adjustment_id'       => $adjustment->id,
                        'article_entrance_id' => $articleEntranceId,
                        'count'               => $params['count'] - ($articleEntrance->count ?? 0),
                        'price'               => $params['price'] - ($articleEntrance->price ?? 0),
                    ]);
                }
            }

            PermissionController::canByPregMatch('Создавать корректировки');
            UA::makeUserAction($adjustment, 'create');

            return response()->json([
                'id'    => $adjustment->id,
                'event' => 'AdjustmentStored',
            ], 200);
        });
    }

    public function delete(Request $request)
    {
        if (!Gate::allows('Удалять денежные операции')) {
            return PermissionController::closedResponse('Вам запрещено это действие.');
        }
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Удаление невозможно',
                'type'    => 'error',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getSideInfo(Request $request)
    {
        $adjustment = Adjustment::find($request->id);

        $manager = $adjustment->manager;
        $comment = $adjustment->comment;

        if ($request->expectsJson()) {
            return response()->json([
                'info'    => view(get_template() . '.adjustments.contact-card', compact('manager', 'request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact('comment', 'request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public static function getAdjustments($request)
    {
        $size = $request['size'] ?? 30;

        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';

        if ($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        $adjustments = Adjustment::select(DB::raw('
                adjustments.*, adjustments.created_at as date, IF(partners.type != 2, partners.fio,partners.companyName) as partner, stores.name as store
            '))
            ->leftJoin('partners', 'partners.id', '=', 'adjustments.manager_id')
            ->leftJoin('stores', 'stores.id', '=', 'adjustments.store_id')
            ->where('adjustments.company_id', Auth::user()->company()->first()->id)
            ->when(is_array($request['accountable']) && !empty($request['accountable']), function ($query) use ($request) {
                $query->whereIn('adjustments.manager_id', $request['accountable']);
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('adjustments.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->groupBy('adjustments.id')
            ->orderBy($field, $dir)
            ->paginate($size);

        return $adjustments;
    }
}
