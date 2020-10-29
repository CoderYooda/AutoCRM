<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\API\TinkoffMerchantAPI;
use App\Http\Requests\Shop\ShowOrderRequest;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Services\ShopManager\ShopManager;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function show(Order $order, ShowOrderRequest $request)
    {
        $positions = DB::table('order_positions')->where('order_id', $order->id)->get();

        $api = new TinkoffMerchantAPI(env('TINKOFF_TERMINAL_KEY'), env('TINKOFF_SECRET_KEY'));

        if($order->tinkoff_id && $order->status == 1) {

            $params = [
                'TerminalKey' => env('TINKOFF_TERMINAL_KEY'),
                'PaymentId'   => $order->tinkoff_id,
            ];

            $api->getState($params);

            if($api->status == 'CONFIRMED') {
                $order->update(['status' => 2]);
            }
            else {
                $canceled_statuses = [
                    'DEADLINE_EXPIRED',
                    'REJECTED',
                    'CANCELED',
                    'AUTH_FAIL'
                ];

                if (in_array($api->status, $canceled_statuses)) {
                    $order->update(['status' => 3]);
                }
            }
        }

        return view('shop.success_order', compact('order', 'positions'))
            ->with('shop', $this->shop)
            ->with('statuses', Order::$statues);
    }
}
