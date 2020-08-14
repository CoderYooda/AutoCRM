<?php

namespace App\Http\Controllers;

use App\Http\Requests\RefundRequest;
use App\Models\Article;
use App\Models\Refund;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use Auth;

class RefundController extends Controller
{
    public static function refundDialog($request)
    {
        $refund = Refund::where('id', (int)$request['refund_id'])->first();

        $tag = 'refundDialog' . ($refund->id ?? '');

        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.refund.dialog.form_refund', compact('refund' , 'request'))->render()
        ]);
    }

    public function getSideInfo(Request $request)
    {
        $client_order = Refund::find($request->id)->load('partner');
        $partner = $client_order->partner;
        $comment = $client_order->comment;

        return response()->json([
            'info' => view(get_template() . '.refund.contact-card', compact('partner', 'request'))->render(),
            'comment' => view(get_template() . '.helpers.comment', compact('comment', 'request'))->render(),
        ], 200);
    }

    public function tableData(Request $request)
    {
        $refunds = RefundController::getRefunds($request);

        return response()->json(['data' => $refunds]);
    }

    public function fresh(Refund $refund, Request $request)
    {
        $request['fresh'] = true;
        $class = 'refundDialog' . $refund->id;
        $inner = true;
        $content = view(get_template() . '.refund.dialog.form_refund', compact( 'refund','class', 'inner', 'request'))->render();
        return response()->json([
            'html' => $content,
            'target' => $class,
        ], 200);
    }

    public function store(RefundRequest $request)
    {
        PermissionController::canByPregMatch('Редактировать возвраты');
        $refund = Refund::firstOrNew(['id' => $request['id']]);
        $shipment = Shipment::find($request->shipment_id);

        $products = $request->products;

        foreach($products as $product) {
            if ($product['count'] > $shipment->getAvailableToRefundArticlesCount($product['id'])) {
                $name = 'products.' . $product['id'] . '.count';
                return response()->json([
                    'messages' => [$name => ['Кол - во не может быть больше чем в продаже']]
                ], 422);
            }
        }

        if($refund->exists){
            $refundWasExisted = true;
            $this->message = 'Возврат обновлен';
            #Добавляем к балансу контакта
            $refund->partner->subtraction($refund->summ);
        } else {
            $refundWasExisted = false;
            //$shipment->company_id = Auth::user()->company()->first()->id;
            $refund->company_id = Auth::user()->company->id;
            $refund->manager_id = Auth::user()->partner->id;
            $this->message = 'Возврат сохранен';
        }

        $refund->fill($request->only($refund->fields));
        $refund->partner_id = $shipment->partner_id;
        $refund->summ = 0;
        $refund->save();

        $store = $shipment->store;

        if($refundWasExisted) {
            foreach($refund->articles as $article){
                $shipment->decreaseRefundedCount($article->id, $article->pivot->count);
            }
        }

        #Возврат товара в поступление
        if(count($shipment->entrances)) {

            foreach ($products as $product) {

                for($i = (int)$product['count']; $i != 0; $i--) {

                    foreach ($shipment->entrances as $entrance) {

                        if($entrance->articles->find($product['id'])->pivot->released_count) {

                            DB::table('article_entrance')
                                ->where('entrance_id', $entrance->id)
                                ->where('article_id', $product['id'])
                                ->where('released_count', '>', 0)
                                ->decrement('released_count');

                            $entrance->articles->find($product['id'])->pivot->released_count--;

                            break;
                        }
                    }
                }
            }
        }

        $discount_percent = 0;

        if($shipment->discount) {
            if($shipment->inpercents) $discount_percent = $shipment->discount;
            else $discount_percent = $shipment->discount * 100 / $shipment->summ;
        }

        $refund_data = [];

        foreach($request['products'] as $product) {

            $shipment_price = $shipment->getProductPriceFromShipment($product['id']);

            $vcount = $product['count'];
            $vprice = $shipment_price - ($shipment_price / 100 * $discount_percent);
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

        #Добавляем к балансу контакта
        $refund->partner->addition($refund->summ);

        foreach($shipment->articles as $product) {
            $shipment->increaseRefundedCount($product->id, $product->pivot->refunded_count + $products[$product->id]['count']);
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
            $dates[0] .= ' 00:00:00';
            $dates[1] .= ' 23:59:59';
            $request['dates'] = $dates;
        }
        if ($field === null && $dir === null) {
            $field = 'created_at';
            $dir = 'DESC';
        }

        if ($request['client'] == null) {
            $request['client'] = [];
        }

        if ($request['accountable'] == null) {
            $request['accountable'] = [];
        }

        $refunds = Refund::select(DB::raw('
            refund.*, refund.created_at as date, refund.id as rid, IF(managers.type != 2, managers.fio,managers.companyName) as manager, IF(partners.type != 2, partners.fio,partners.companyName) as partner, refund.summ as price
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
                $query->whereIn('refund.partner_id', $request['client']);
            })
            ->when($request['dates_range'] != null, function ($query) use ($request) {
                $query->whereBetween('refund.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
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
