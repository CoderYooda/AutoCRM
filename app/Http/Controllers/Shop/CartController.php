<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\CartSaveRequest;
use App\Http\Requests\Shop\CartStoreRequest;
use App\Interfaces\Shop\CartInterface;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Shop;
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
        $products = Article::whereIn('id', $cart->all())->get();

        return view('shop.cart', compact('products'))
            ->with('shop', $this->shop);
    }

    public function store(CartStoreRequest $request, CartInterface $cart)
    {
        $product_id = $request->product_id;

        $cart->addProduct($product_id);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт был добавлен в корзину.',
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
