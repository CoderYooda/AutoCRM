<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public static function dialog(Request $request)
    {
        $order = Order::with('partner', 'positions')->find($request->order_id);

        foreach ($order->positions as &$position) {
            $position['total'] = $position->price * $position->count;
        }

        $class = 'orderDialog' . ($order->id ?? '');

        $items = $order ? $order->positions->toArray() : [];

        $view = view(get_template() . '.shop_orders.dialog.form_order', compact('order', 'class', 'request'));

        $prefs = [
            'use_nds' => false,
            'can_add_items' => $order->status == Order::MODERATING_STATUS,
            'nds' => 0,
            'freeze' => $order->status != Order::MODERATING_STATUS,
            'nds_included' => false
        ];

        $view->with('statuses', Order::$statuses)
            ->with('prefs', json_encode($prefs))
            ->with('items', json_encode($items));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }

    public static function getOrders(Request $request)
    {
        if($request['dates_range']) {
            $dates = explode('|', $request['dates_range']);
            $request['dates'] = $dates;
        }

        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';
        $size = $request['size'] ? (int)$request['size'] : 30;

        if($field == 'partner_name') $field = 'partner_id';

        $company_id = Auth::user()->company_id;

        /** @var Order[] $orders */
        $orders = Order::with('partner', 'positions')
            ->where('company_id', $company_id)
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('entrance_refunds.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->groupBy('id')
            ->orderBy($field, $dir)
            ->paginate($size);

        foreach ($orders as $key => $order) {
            $orders[$key]['partner_name'] = $order->partner->official_name;
            $orders[$key]['status'] = $order->getStatusName();
        }

        return $orders;
    }
}
