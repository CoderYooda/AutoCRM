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

        $entrances = [];

        if($adjustment) {
            $articleEntranceIds = DB::table('adjustment_article_entrance')->where('adjustment_id', $adjustment->id)->get();

            $entrances = DB::table('article_entrance')->whereIn('id', $articleEntranceIds->pluck('article_entrance_id'))->get();
        }

        $view = view(get_template() . '.adjustments.dialog.form_adjustment', compact( 'adjustment',  'request', 'entrances'))
            ->with('class', $tag);

        return response()->json([
            'tag' => $tag,
            'html' => $view->render()
        ]);
    }

    public function search(SearchRequest $request)
    {
        $class = $request->refer;

        $article = Article::find($request->product_id);

        $company = Auth::user()->company;

        $entrances = DB::table('article_entrance')
            ->where([
                'company_id' => $company->id,
                'article_id' => $article->id
            ])
            ->get();

        $view = view(get_template() . '.adjustments.dialog.product_elements', compact('entrances', 'article', 'class'));

        return response()->json([
            'html' => $view->render(),
            'entrances' => $entrances,
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
        return DB::transaction(function () use($request) {

            $user = Auth::user();

            $adjustment = Adjustment::create([
                'company_id' => $user->company_id,
                'manager_id' => $user->id,
                'store_id' => $user->current_store,
                'comment' => $request->comment
            ]);

            foreach ($request->products as $entrance_id => $articles) {

                foreach ($articles as $article_id => $count) {

                    $attributes = [
                        'entrance_id' => $entrance_id,
                        'article_id' => $article_id,
                    ];

                    $articleEntrance = DB::table('article_entrance')->where($attributes)->first();

                    DB::table('article_entrance')->where($attributes)->update([ 'count' => $count ]);

                    DB::table('adjustment_article_entrance')->insertOrIgnore([
                        'adjustment_id' => $adjustment->id,
                        'article_entrance_id' => $articleEntrance->id,
                        'count' => $count - $articleEntrance->count
                    ]);
                }
            }

            PermissionController::canByPregMatch($adjustment->wasRecentlyCreated ?  'Создавать корректировки' : 'Редактировать корректировки');
            UA::makeUserAction($adjustment, $adjustment->wasRecentlyCreated ? 'create' : 'update');

            return response()->json([
                'id' => $adjustment->id,
                'event' => 'AdjustmentStored',
            ], 200);
        });
    }

    public function delete(Request $request){
        if(!Gate::allows('Удалять денежные операции')){
            return PermissionController::closedResponse('Вам запрещено это действие.');
        }
        if($request->expectsJson()){
            return response()->json([
                'message' => 'Удаление невозможно',
                'type' => 'error',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getSideInfo(Request $request){

        $adjustment = Adjustment::with('partner')->find($request['id']);
        $partner = $adjustment->partner;
        $comment = $adjustment->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(get_template() . '.adjustments.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(get_template() . '.helpers.comment', compact( 'comment','request'))->render(),
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

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }

        $adjustments = Adjustment::select(DB::raw('
                adjustments.*, adjustments.created_at as date, IF(partners.type != 2, partners.fio,partners.companyName) as partner, stores.name as store
            '))
                ->leftJoin('partners',  'partners.id', '=', 'adjustments.manager_id')
                ->leftJoin('stores',  'stores.id', '=', 'adjustments.store_id')

                ->where('adjustments.company_id', Auth::user()->company()->first()->id)

                ->when($request['accountable'] != null, function($query) use ($request) {
                    $query->whereIn('adjustments.partner_id', $request['accountable']);
                })
                ->when($request['dates_range'] != null, function($query) use ($request) {
                    $query->whereBetween('adjustments.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
                })
                ->groupBy('adjustments.id')
                ->orderBy($field, $dir)
                ->paginate($size);

        return $adjustments;
    }
}
