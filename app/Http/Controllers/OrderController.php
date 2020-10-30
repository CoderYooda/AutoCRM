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
            $position['total_price'] = $position->price * $position->count;
        }

        $class = 'orderDialog' . ($order->id ?? '');

        $view = view(get_template() . '.shop_orders.dialog.form_order', compact('order', 'class', 'request'));

        $view->with('statuses', Order::$statuses);

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

        $entrance_refunds = Order::with('partner', 'positions')
            ->where('company_id', $company_id)
            ->when($request['dates_range'] != null, function($query) use ($request) {
                $query->whereBetween('entrance_refunds.created_at', [Carbon::parse($request['dates'][0]), Carbon::parse($request['dates'][1])]);
            })
            ->groupBy('id')
            ->orderBy($field, $dir)
            ->paginate($size);

        foreach ($entrance_refunds as $entrance_refund) {
            $entrance_refund['partner_name'] = $entrance_refund->partner->official_name;
        }

        return $entrance_refunds;
    }
}
