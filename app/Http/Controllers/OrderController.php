<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public static function dialog(Request $request)
    {
        $order = Order::with('partner', 'products')->find($request->order_id);

        $class = 'orderDialog' . ($order->id ?? '');

        $view = view(get_template() . '.shop_orders.dialog.form_order', compact('order', 'class', 'request'));

        $view->with('statuses', Order::$statues);

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }
}
