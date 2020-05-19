<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdjustmentRequest;
use App\Models\Adjustment;
use App\Models\ClientOrder;
use Illuminate\Http\Request;
use App\Models\Store;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use Auth;

class AdjustmentController extends Controller
{
    public static function adjustmentDialog($request)
    {
        $tag = 'adjustmentDialog';
        if($request['adjustment_id']){
            $adjustment = Adjustment::where('id', (int)$request['adjustment_id'])->first();
            $tag .= $adjustment->id;
        } else {
            $adjustment = null;
        }

        $stores = Store::where('company_id', Auth::user()->id)->get();

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.adjustments.dialog.form_adjustment', compact( 'adjustment', 'stores',  'request'))->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $adjustments = AdjustmentController::getAdjustments($request);
        foreach($adjustments as $adjustment){
            $adjustment->date = $adjustment->created_at->format('Y.m.d/H:i');
        }
        return response()->json($adjustments);
    }

    public function store(AdjustmentRequest $request)
    {
        PermissionController::canByPregMatch($request['id'] ? 'Редактировать корректировки' : 'Создавать корректировки');
        $adjustment = new Adjustment();
        $adjustment->company_id = Auth::user()->company()->first()->id;
        $adjustment->manager_id = Auth::user()->partner()->first()->id;
        $this->message = 'Корректировка сохранена';
        $adjustment->fill($request->only($adjustment->fields));
        $adjustment->save();


        $adjustment_data = [];
        $store = $adjustment->store()->first();

        foreach($request['products'] as $id => $product) {

            $fact = $product['fact'];
            //$vprice = $product['price'];

            $deviation_count = $store->getArticlesCountById($id) - $fact;
            //$deviation_price = $store->getMidPriceById($id) - $vprice;

            $store->setArticleCount($id, $fact);
            //$store->setArticleMidPrice($id, $vprice);

            $pivot_data = [
                'article_id' => (int)$product['id'],
                'store_id' => (int)$request['store_id'],
                'adjustment_id' => $adjustment->id,
                'prev_count' => (int)$fact + $deviation_count,
                'count' => (int)$fact,
                'price' => null,
                'prev_price' => null,
                'deviation_count' => (int)$deviation_count,
                'deviation_price' => null
            ];
            $adjustment_data[] = $pivot_data;
        }

        #Удаление всех отношений и запись новых (кастомный sync)
        $adjustment->articles()->sync($adjustment_data, true);

        UA::makeUserAction($adjustment, 'create');

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $adjustment->id,
                'event' => 'AdjustmentStored',
            ], 200);
        } else {
            return redirect()->back();
        }

    }

    public function fresh($id, Request $request)
    {
        $adjustment = Adjustment::where('id', (int)$id)->first();

        $adjustment->articles = $adjustment->articles()->get();

        $stores = Store::where('company_id', Auth::user()->id)->get();

        foreach($adjustment->articles as $article){
            $article->instock = $article->getCountInStoreId($adjustment->store_id);
            if($article->instock >= $article->pivot->count){
                $article->complited = true;
            } else {
                $article->complited = false;
            }
        }

        $request['fresh'] = true;
        $class = 'adjustmentDialog' . $id;
        $inner = true;
        $content = view(env('DEFAULT_THEME', 'classic') . '.adjustments.dialog.form_adjustment', compact( 'adjustment', 'stores', 'class', 'inner', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'adjustmentDialog' . $id,
        ], 200);
    }

    public function delete(Request $request){
        if(!Gate::allows('Удалять денежные операции')){
            return PermissionController::closedResponse('Вам запрещено это действие.');
        }
        if($request->expectsJson()){
            return response()->json([
                'message' => 'Удаление невозможно',
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function getSideInfo(Request $request){

        $adjustment = Adjustment::owned()->where('id', $request['id'])->first();
        $partner = $adjustment->partner()->first();
        $comment = $adjustment->comment;
        if($request->expectsJson()){
            return response()->json([
                'info' => view(env('DEFAULT_THEME', 'classic') . '.adjustments.contact-card', compact( 'partner','request'))->render(),
                'comment' => view(env('DEFAULT_THEME', 'classic') . '.helpers.comment', compact( 'comment','request'))->render(),
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public static function getAdjustments($request)
    {
        $size = 30;
        if(isset($request['size'])){
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if(isset($request['sorters'])){
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if($field === null &&  $dir === null){
            $field = 'created_at';
            $dir = 'DESC';
        }

        if($request['dates_range'] !== null){
            $dates = explode('|', $request['dates_range']);
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }

        if($request['accountable'] == null){
            $request['accountable'] = [];
        }

        $adjustments =
            Adjustment::select(DB::raw('
                adjustments.*, adjustments.created_at as date, IF(partners.isfl = 1, partners.fio,partners.companyName) as partner, stores.name as store
            '))
                ->leftJoin('partners',  'partners.id', '=', 'adjustments.partner_id')
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

//        select shipments.id, shipments.created_at, IF(partners.isfl = 1, partners.fio,partners.companyName) as partner, shipments.discount, shipments.summ as price, shipments.itogo as total
//        from shipments
//        left join `partners` on `partners`.`id` = `shipments`.`partner_id`
//        and `shipments`.`company_id` = 2
//        group by `shipments`.`id`
//        order by `created_at` desc

        return $adjustments;




//        $client_orders = Adjustment::owned()
//            ->orderBy('created_at', 'DESC')
//            ->where(function($q) use ($request){
//                if(isset($request['date_start']) && $request['date_start'] != 'null' && $request['date_start'] != ''){
//                    $q->where('do_date',  '>=',  Carbon::parse($request['date_start']));
//                }
//                if(isset($request['date_end']) && $request['date_end'] != 'null' && $request['date_end'] != ''){
//                    $q->where('do_date', '<=', Carbon::parse($request['date_end']));
//                }
//            })
//            ->where(function($q) use ($request){
//                if(isset($request['search']) && $request['search'] !== 'null') {
//                    if (mb_strlen($request['search']) === 1) {
//                        $q->whereHas('partner', function ($q) use ($request) {
//                            $q->where('fio', 'LIKE', $request['search'] . '%' )
//                                ->orWhere('companyName', 'LIKE', $request['search'] . '%');
//                        });
//                    } else {
//                        $q->whereHas('partner', function ($q) use ($request) {
//                            $q->where('fio', 'LIKE', '%' . $request['search'] . '%')
//                                ->orWhere('companyName', 'LIKE', '%' . $request['search'] . '%')
//                                ->orWhereHas('phones', function ($query) use ($request) {
//                                    $query->where('number', 'LIKE', '%' . $request['search'] . '%');
//                                });
//                        });
//                    }
//                }
//            })
//            ->paginate(16);

//        return $client_orders;
    }
}
