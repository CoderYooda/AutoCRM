<?php

namespace App\Http\Controllers\Shop;

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
        $positions = DB::table('order_articles')->where('order_id', $order->id)->get();

        return view('shop.success_order', compact('order', 'positions'))
            ->with('shop', $this->shop)
            ->with('statuses', Order::$statues);
    }
}
