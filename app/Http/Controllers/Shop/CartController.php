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
        $products = Article::whereIn('id', array_keys($cart->all()))->get();
        $stores = Store::where('company_id', $this->shop->company_id)->get();

        return view('shop.cart', compact('products', 'stores'))
            ->with('shop', $this->shop);
    }

    public function store(CartStoreRequest $request, CartInterface $cart)
    {
        $cart->addProduct($request->product_id);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт был добавлен в корзину.',
            'total' => $cart->total()
        ]);
    }

    public function delete(CartDeleteRequest $request, CartInterface $cart)
    {
        $cart->removeProduct($request->product_id);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт был удалён из корзины.',
            'total' => $cart->total()
        ]);
    }

    public function save(CartSaveRequest $request, CartInterface $cart)
    {
        $cart->setProductCount($request->product_id, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Количество было успешно изменено.',
            'total' => $cart->total()
        ]);
    }
}
