<?php

namespace App\Http\Controllers;

use App\Events\ModelWasStored;
use App\Http\Requests\AdjustmentRequest;
use App\Http\Requests\Adjustments\SearchRequest;
use App\Models\Adjustment;
use App\Models\Product;
use App\Models\Entrance;
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

        $class = 'adjustmentDialog' . ($adjustment->id ?? '');

        $products = [];

        if ($adjustment) {

//            $adjustmentArticleEntrances = DB::table('adjustment_article_entrance')->where('adjustment_id', $adjustment->id)->get();
//            $productEntrances = DB::table('article_entrance')->whereIn('id', $adjustmentArticleEntrances->pluck('product_entrance_id'))->get();

            $productsAdjustment = DB::table('article_adjustment')->where('adjustment_id', $adjustment->id)->get();

            $productNames = Product::with('supplier')->whereIn('id', $productsAdjustment->pluck('product_id'))->get();

            foreach ($productsAdjustment as $productAdjustment) {

                $product_id = $productAdjustment->product_id;

                $productEntrance = DB::table('article_entrance')->find($productAdjustment->product_entrance_id);

                $products[$product_id]['name'] = $productNames->find($product_id)->name;
                $products[$product_id]['article'] = $productNames->find($product_id)->article;
                $products[$product_id]['manufacturer'] = $productNames->find($product_id)->supplier->name;

                $products[$product_id]['entrances'][$productEntrance->id] = [
                    'id'              => $productEntrance->id,
                    'created_at'      => Carbon::parse($productEntrance->created_at)->format('d.m.Y'),
                    'deviation_price' => $productAdjustment->deviation_price,
                    'deviation_count' => $productAdjustment->deviation_count,
                    'price'           => $productAdjustment->price,
                    'count'           => $productAdjustment->count,
                ];
            }
        }

        $view = view(get_template() . '.adjustments.dialog.form_adjustment', compact('adjustment', 'request', 'products', 'class'));

        return response()->json([
            'tag'  => $class,
            'html' => $view->render()
        ]);
    }

    public function search(SearchRequest $request)
    {
        $class = $request->refer;

        $product = Product::find($request->product_id);

        $company = Auth::user()->company;

        $productEntrances = DB::table('article_entrance')
            ->whereRaw('released_count < count')
            ->where([
                'company_id' => $company->id,
                'product_id' => $product->id
            ])
            ->get();

        $productAttributes = [
            'name'         => $product->name,
            'manufacturer' => $product->supplier->name,
            'article'      => $product->article,
            'entrances'    => []
        ];

        foreach ($productEntrances as $productEntrance) {

            if ($productEntrance->count == $productEntrance->released_count) continue;

            $productAttributes['entrances'][$productEntrance->id] = [
                'id'             => $productEntrance->id,
                'created_at'     => date('d.m.Y', strtotime($productEntrance->created_at)),
                'count'          => $productEntrance->count,
                'price'          => $productEntrance->price,
                'released_count' => $productEntrance->released_count
            ];
        }

        $view = view(get_template() . '.adjustments.dialog.includes.product_element', compact('class', 'productAttributes'))
            ->with('product_id', $product->id);

        return response()->json([
            'html'    => $view->render(),
            'product' => $product
        ]);
    }

    public function tableData(Request $request)
    {
        $adjustments = AdjustmentController::getAdjustments($request);
        return response()->json(['data' => $adjustments]);
    }

    public function store(AdjustmentRequest $request)
    {
        PermissionController::canByPregMatch('Создавать корректировки');

        return DB::transaction(function () use ($request) {

            $user = Auth::user();
            $partner = Auth::user()->partner;

            $adjustment = Adjustment::create([
                'company_id' => $partner->company_id,
                'manager_id' => $partner->id,
                'store_id'   => $user->current_store,
                'comment'    => $request->comment
            ]);

            foreach ($request->products as $entrance_id => $products) {

                foreach ($products as $product_id => $params) {

                    $query = DB::table('article_entrance');

                    $productEntranceId = $entrance_id;

                    if ($productEntranceId == 'new') {

                        if ($params['count'] == 0) continue;

                        $attributes = [
                            'entrance_id' => null,
                            'product_id'  => $product_id,
                            'company_id'  => $partner->company_id,
                            'store_id'    => $user->current_store,
                            'price'       => $params['price'],
                            'count'       => $params['count'],
                            'created_at'  => Carbon::now(),
                            'updated_at'  => Carbon::now()
                        ];

                        $productEntranceId = $query->insertGetId($attributes);
                    }

                    $productEntrance = DB::table('article_entrance')->find($productEntranceId);

                    if ($entrance_id != 'new') {
                        $query->where('id', $entrance_id)->update([
                            'count'      => ($productEntrance->released_count + $params['count']),
                            'price'      => $params['price'],
                            'updated_at' => Carbon::now()
                        ]);
                    }

                    DB::table('article_adjustment')->insert([
                        'product_id'          => $product_id,
                        'adjustment_id'       => $adjustment->id,
                        'product_entrance_id' => $productEntranceId,
                        'store_id'            => Auth::user()->current_store,
                        'count'               => $params['count'],
                        'prev_count'          => $entrance_id == 'new' ? 0 : $productEntrance->count,
                        'deviation_count'     => $params['count'] - $productEntrance->count,
                        'price'               => $params['price'],
                        'prev_price'          => $entrance_id == 'new' ? 0 : $productEntrance->price,
                        'deviation_price'     => $params['price'] - $productEntrance->price,
                        'total'               => $params['price'] * $params['count']
                    ]);
                }
            }

            UA::makeUserAction($adjustment, 'create');

            event(new ModelWasStored($adjustment->company_id, 'AdjustmentStored'));

            return response()->json([
                'id'    => $adjustment->id
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

        $adjustments = Adjustment::with('manager', 'store')
            ->where('company_id', Auth::user()->company_id)
            ->when(is_array($request['accountable']), function ($query) use ($request) {
                $query->whereIn('manager_id', $request['accountable']);
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->when($request['search'], function ($query) use($request) {
                $query->where(function ($query) use($request) {
                    $query->where('adjustments.id', 'like', "%{$request->search}%")
                        ->orWhereHas('manager', function ($query) use($request) {
                            $query->where('company_id', Auth::user()->company_id)
                                ->where('foundstring', 'like', "%{$request->search}%");
                        });
                });
            })
            ->groupBy('id')
            ->orderBy($field, $dir)
            ->paginate($size);

        foreach ($adjustments as $index => $adjustment) {
            $adjustments[$index]['manager_name'] = $adjustment->manager->official_name;
            $adjustments[$index]['store_name'] = $adjustment->store->name;
        }

        return $adjustments;
    }
}
