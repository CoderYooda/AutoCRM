<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\CartDeleteRequest;
use App\Http\Requests\Shop\CartSaveRequest;
use App\Http\Requests\Shop\CartStoreRequest;
use App\Interfaces\Shop\CartInterface;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Shop;
use App\Models\Store;
use App\Services\ShopManager\ShopManager;

class CartController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index(CartInterface $cart)
    {
        $cartOrders = $cart->all();

        $orders = [];
        $storesTotal = [];

        foreach ($cartOrders as $hash => $order) {
            $product = Article::with('stores')->find($order['data']['product_id']);

            $store = null;

            if(isset($order['data']['store_id'])) {
                $store = Store::find($order['data']['store_id']);
                if(!isset($storesTotal[$store->id])) $storesTotal[$store->id] = 0;
                $storesTotal[$store->id] += $product->stores->find($store->id)->pivot->retail_price;
            }

            $orders[$hash] = [
                'manufacturer' => $order['data']['model']['hash_info']['manufacturer'] ?? $product->supplier->name,
                'article' => $order['data']['model']['hash_info']['article'] ?? $product->article,
                'name' => $product->name,
                'price' => $order['data']['model']['hash_info']['price'] ?? $product->stores->find($store->id)->pivot->retail_price,
                'image' => $product->image_path,
                'count' => $cart->getProductCount($hash)
            ];
        }

        $stores = Store::where('company_id', $this->shop->company_id)->get();

        $totalPrice = 0;

        foreach ($orders as $order) {
            $totalPrice += $order['price'] * $order['count'];
        }

        return view('shop.cart', compact('orders', 'stores', 'totalPrice', 'storesTotal'))
            ->with('shop', $this->shop);
    }

    public function store(CartStoreRequest $request, CartInterface $cart)
    {
        $cart->addProduct($request->hash, $request->order, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт был добавлен в корзину.',
            'total' => $cart->total()
        ]);
    }

    public function delete(CartDeleteRequest $request, CartInterface $cart)
    {
        $cart->removeProduct($request->hash);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт был удалён из корзины.',
            'total' => $cart->total()
        ]);
    }

    public function clear(CartInterface $cart)
    {
        $cart->clear();

        return response()->json([
            'type' => 'success',
            'message' => 'Корзина успешно очищена.',
        ]);
    }

    public function save(CartSaveRequest $request, CartInterface $cart)
    {
        $cart->setProductCount($request->hash, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Количество было успешно изменено.',
            'total' => $cart->total()
        ]);
    }
}
