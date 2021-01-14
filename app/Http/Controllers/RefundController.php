<?php

namespace App\Http\Controllers;

use App\Events\ModelWasStored;
use App\Http\Requests\RefundRequest;
use App\Models\Product;
use App\Models\Entrance;
use App\Models\Refund;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;
use Auth;
use function foo\func;

class RefundController extends Controller
{
    public static function refundDialog(Request $request)
    {
        $refund = Refund::find($request['refund_id']);

        /** @var Shipment $shipment */
        $shipment = $refund->shipment ?? null;

        $tag = 'refundDialog' . ($refund->id ?? '');

//        $refunded_count = [];
//
//        if($refund) {
//            foreach ($refund->shipment->products as $product) {
//                if (!isset($refunded_count[$product->id])) $refunded_count[$product->id] = 0;
//                $refunded_count[$product->id] += $product->pivot->refunded_count;
//            }
//            $shipment = $refund->shipment;
//        }



        $products = $refund->products ?? [];
        foreach($products as $product) {
            $product->shipment_count = $shipment->getProductCount($product->id);
            $product->refunded_count = $shipment->getRefundedCount($product->id);
        }


        $view = view(get_template() . '.refund.dialog.form_refund', compact('refund', 'shipment', 'request', 'products'))
            ->with('class', $tag);

        return response()->json([
            'tag' => $tag,
            'html' => $view->render()
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
        $shipment = $refund->shipment;
        $request['fresh'] = true;
        $class = 'refundDialog' . $refund->id;
        $inner = true;
        $products = $refund->products ?? [];

        foreach($products as $product) {
            $product->shipment_count = $shipment->getProductCount($product->id);
            $product->refunded_count = $shipment->getRefundedCount($product->id);
        }
        $content = view(get_template() . '.refund.dialog.form_refund', compact( 'refund', 'shipment','class', 'inner', 'request', 'products'))->render();
        return response()->json([
            'html' => $content,
            'target' => $class,
        ], 200);
    }

    public function store(RefundRequest $request)
    {
        return DB::transaction(function () use($request) {

            PermissionController::canByPregMatch('Редактировать возвраты');

            $refund = Refund::firstOrNew(['id' => $request['id']]);
            $shipment = Shipment::find($request->shipment_id);

            $products = $request->products;

            foreach ($products as $id => $product) {
                if ($product['count'] > $shipment->getAvailableToRefundProductsCount($id)) {
                    $name = 'products.' . $id . '.count';
                    return response()->json([
                        'messages' => [$name => ['Кол - во не может быть больше чем в продаже']]
                    ], 422);
                }
            }

            $refund->company_id = Auth::user()->company->id;
            $refund->manager_id = Auth::user()->partner->id;
            $this->message = 'Возврат сохранен';

            $refund->fill($request->only($refund->fields));
            $refund->partner_id = $shipment->partner_id;
            $refund->save();

            $store = $shipment->store;

            $discount_percent = 0;

            if ($shipment->discount) {
                if ($shipment->inpercents) $discount_percent = $shipment->discount;
                else $discount_percent = $shipment->discount * 100 / $shipment->summ;
            }

            $refund_data = [];

            foreach ($request['products'] as $id => $product) {

                #Добавляем количество возвращенных товаров в продажу
                $entrances = $shipment->incrementRefundedCount($id, $product['count']);

                #Убаляем количество реализованных товаров с поступления
                foreach ($entrances as $entrance_id => $amount) {
                    Entrance::decrementReleasedCount($entrance_id, $id, $amount);
                }

                #Создаем связь в article_refund
                $shipment_price = $shipment->getProductPriceFromShipment($id);

                $vcount = $product['count'];
                $vprice = $shipment_price - ($shipment_price / 100 * $discount_percent);
                $vtotal = $vprice * $vcount;
                $refund->summ += $vtotal;

                $refund_data[$id] = [
                    'refund_id' => $refund->id,
                    'store_id' => $store->id,
                    'count' => $vcount,
                    'price' => (double)$vprice,
                    'total' => (double)$vtotal
                ];
            }

            $total_summ = collect($refund_data)->sum('total');

            $refund->update(['summ' => $total_summ]);

            #Запись новых отношений
            $refund->products()->sync($refund_data);

            #Добавляем к балансу контакта
            $refund->partner->addition($refund->summ);

            UA::makeUserAction($refund, 'create');

            event(new ModelWasStored($refund->company_id, 'RefundStored'));

            return response()->json([
                'message' => $this->message,
                'id' => $refund->id
            ]);
        });
    }

    public static function getRefunds($request)
    {
        $size = $request['size'] ?? 30;

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
            ->where('refund.company_id', Auth::user()->company_id)
            ->groupBy('refund.id')
            ->orderBy($field, $dir)
            //->toSql();

            //dd($entrances);
            ->paginate($size);

        return $refunds;
    }

}
