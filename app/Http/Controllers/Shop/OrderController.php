<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\API\TinkoffMerchantAPI;
use App\Http\Requests\Shop\ShowOrderRequest;
use App\Mail\Shop\PayedOrder;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Services\ShopManager\ShopManager;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Mpdf\Mpdf;

class OrderController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function show($hash, ShowOrderRequest $request)
    {
        $order = Order::where('hash', $hash)->firstOrFail();

        /** @var Shop $shop */
        $shop = $order->shop;

        $positions = DB::table('order_positions')->where('order_id', $order->id)->get();

        $paymentMethod = $shop->getActivePaymentMethod();

        if($paymentMethod != [] && $paymentMethod['name'] == 'tinkoff') {

            $api = new TinkoffMerchantAPI($paymentMethod['params']['terminal_key'], $paymentMethod['params']['secret_key']);

            if ($order->tinkoff_id && $order->status == 1) {

                $params = [
                    'PaymentId'   => $order->tinkoff_id,
                ];

                $api->getState($params);

                if ($api->status == 'CONFIRMED') {
                    $order->update(['status' => 2]);

                    Mail::to($order->email)->send(new PayedOrder($order));
                } else {
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
        }

        return view('shop.success_order', compact('order', 'positions'))
            ->with('shop', $this->shop)
            ->with('statuses', Order::$statuses);
    }

    public function print($hash)
    {
        $order = Order::where('hash', $hash)->firstOrFail();

        $totalPrice = 0;

        foreach ($order->positions as $position) {
            $totalPrice += $position->count * $position->price;
        }

        $view = view('shop.print.order', compact('order', 'totalPrice'));

        $html = str_replace("\n", '', $view->render());

        $mpdf = new Mpdf([]);
        $mpdf->WriteHTML($html);
        $mpdf->Output();
    }
}
