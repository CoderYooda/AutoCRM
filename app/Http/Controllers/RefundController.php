<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use Auth;

class RefundController extends Controller
{
    public static function refundDialog($request)
    {
        $tag = 'refundDialog';

        if ($request['refund_id']) {
            $refund = Refund::where('id', (int)$request['refund_id'])->first();

            $tag .= $refund->id;
        } else {
            $refund = null;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view(env('DEFAULT_THEME', 'classic') . '.refund.dialog.form_refund', compact('refund', 'request'))->render()
        ]);
    }

    public function tableData(Request $request)
    {
        $refunds = RefundController::getRefunds($request);
        foreach ($refunds as $refund) {
            $refund->date = $refund->created_at->format('d.m.Y/H:i');
        }

        return response()->json($refunds);
    }

    public function fresh(Refund $refund, Request $request)
    {
        $request['fresh'] = true;
        $class = 'refundDialog' . $refund->id;
        $inner = true;
        $content = view(env('DEFAULT_THEME', 'classic') . '.refund.dialog.form_refund', compact( 'refund','class', 'inner', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => $class,
        ], 200);
    }

    public function store(Request $request)
    {
        $refund = Refund::firstOrNew(['id' => $request['id']]);

        $validation = Validator::make($request->all(), self::validateRules());

        if(!isset($request['products']) || $request['products'] == []) {
            return response()->json([
                'system_message' => ['Проведение возврата без товаров невозможно']
            ], 422);
        }

        if($validation->fails()){
            $this->status = 422;
            if($request->expectsJson()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }


        if($refund->exists){
            $refundWasExisted = true;
            $this->message = 'Возврат обновлен';
            #Добавляем к балансу контрагента
            $refund->partner()->first()->subtraction($refund->summ);
        } else {
            $refundWasExisted = false;
            //$shipment->company_id = Auth::user()->company()->first()->id;
            $refund->company_id = Auth::user()->company()->first()->id;
            $refund->manager_id = Auth::user()->partner()->first()->id;
            $this->message = 'Возврат сохранен';
        }



        $refund->fill($request->only($refund->fields));
        $refund->partner_id = $refund->shipment->partner->id;
        $refund->summ = 0;
        $refund->save();

        $store = $refund->store()->first();

        if($refundWasExisted){
            foreach($refund->articles()->get() as $article){
                $store->decreaseArticleCount($article->id, $article->pivot->count);
                $refund->shipment->decreaseRefundedCount($article->id, $article->pivot->count);
            }
        }

        $refund_data = [];

        foreach($request['products'] as $product) {
            if ($refund->shipment) {
                if ($product['count'] > $refund->shipment->getAvailableToRefundArticlesCount($product['id'])) {
                    $name = 'products.' . $product['id'] . '.count';
                    return response()->json([
                        'messages' => [$name => ['Кол - во не может быть больше чем в продаже']]
                    ], 422);
                }
            }
        }


        foreach($request['products'] as $product) {

            $store->increaseArticleCount($product['id'], $product['count']);

            $vcount = $product['count'];
            $vprice = $refund->shipment->getProductPriceFromShipment($product['id']);
            $vtotal = $vprice * $vcount;
            $refund->summ += $vtotal;
            $pivot_data = [
                'article_id' => (int)$product['id'],
                'refund_id' => $refund->id,
                'store_id' => $store->id,
                'count' => (int)$vcount,
                'price' => (double)$vprice,
                'total' => (double)$vtotal
            ];

            $refund_data[] = $pivot_data;
        }

        $refund->save();

        #Удаление всех отношений и запись новых (кастомный sync)
        $refund->syncArticles($refund->id, $refund_data);

        #Добавляем к балансу контрагента
        $refund->partner->addition($refund->summ);

        foreach($refund->articles as $article){
            $refund->shipment->increaseRefundedCount($article->id, $article->pivot->count);
        }

        UA::makeUserAction($refund, $refundWasExisted ? 'fresh' : 'create');

        if($request->expectsJson()){
            return response()->json([
                'message' => $this->message,
                'id' => $refund->id,
                'event' => 'RefundStored'
            ], 200);
        } else {
            return redirect()->back();
        }
    }

    public function delete($id, Request $request)
    {
        if(!Gate::allows('Удалять возвраты')){
            return PermissionController::closedResponse('Вам запрещено это действие.');
        }

        $returnIds = null;
        if($id == 'array'){
            $refunds = Refund::whereIn('id', $request['ids']);
            $this->message = 'Возвраты удалены';
            $returnIds = $refunds->get()->pluck('id');
            foreach($refunds->get() as $refund){
                if($refund->delete()){
                    foreach($refund->articles()->get() as $article){
                        $store = $refund->store()->first();
                        $store->decreaseArticleCount($article->id, $refund->getArticlesCountById($article->id));
                    }
                    #Добавляем к балансу контрагента
                    $refund->partner()->first()->addition($refund->summ);
                    $refund->articles()->sync(null);
                    UA::makeUserAction($refund, 'delete');
                }
            }
        } else {
            $refund = Refund::where('id', $id)->first();
            $returnIds = $refund->id;
            foreach($refund->articles()->get() as $article){
                $store = $refund->store()->first();
                $store->decreaseArticleCount($article->id, $refund->getArticlesCountById($article->id));
            }
            #Добавляем к балансу контрагента
            $refund->partner()->first()->addition($refund->summ);
            $refund->articles()->sync(null);
            $refund->delete();
            $this->status = 200;
            $this->message = 'Возврат удален';
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message,
            'event' => 'RefundStored',
        ], 200);


    }

    private static function validateRules()
    {
        $rules = [
            'shipment_id' => ['required', 'exists:shipments,id'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'min:1', 'max:9999'],
        ];

        return $rules;
    }

    public static function getRefunds($request)
    {

        $size = 30;
        if (isset($request['size'])) {
            $size = (int)$request['size'];
        }

        $field = null;
        $dir = null;

        if (isset($request['sorters'])) {
            $field = $request['sorters'][0]['field'];
            $dir = $request['sorters'][0]['dir'];
        }
        if ($request['dates_range'] !== null) {
            $dates = explode('|', $request['dates_range']);
            //dd(Carbon::parse($dates[0]));
            $request['dates'] = $dates;
        }
        if ($field === null && $dir === null) {
            $field = 'created_at';
            $dir = 'DESC';
        }

        if ($request['provider'] == null) {
            $request['provider'] = [];
        }

        if ($request['accountable'] == null) {
            $request['accountable'] = [];
        }

        $refunds = Refund::select(DB::raw('
            refund.*, refund.created_at as date, refund.id as rid, IF(managers.isfl = 1, managers.fio,managers.companyName) as manager, IF(partners.isfl = 1, partners.fio,partners.companyName) as partner, refund.summ as price
        '))
            ->leftJoin('partners as managers',  'managers.id', '=', 'refund.manager_id')
            ->leftJoin('partners',  'partners.id', '=', 'refund.partner_id')
//            ->when($request['provider'] != [], function ($query) use ($request) {
//                $query->whereIn('partner_id', $request['provider']);
//            })
//            ->when($request['clientorder_status'] != null, function ($query) use ($request) {
//                $query->where('status', $request['clientorder_status']);
//            })
//            ->when($request['accountable'] != [], function ($query) use ($request) {
//                $query->whereIn('client_orders.partner_id', $request['accountable']);
//            })
            ->when($request['client'] != [], function ($query) use ($request) {
                $query->whereIn('client_orders.partner_id', $request['client']);
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('client_orders.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->where('refund.company_id', Auth::user()->company()->first()->id)
            ->groupBy('refund.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($entrances);
            ->paginate($size);

        return $refunds;
    }

}
