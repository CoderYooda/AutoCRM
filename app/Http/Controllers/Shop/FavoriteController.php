<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\StoreFavoriteRequest;
use App\Http\Controllers\Controller;
use App\Interfaces\Shop\FavoriteInterface;
use App\Models\Product;
use App\Models\Shop;
use App\Services\ShopManager\ShopManager;

class FavoriteController extends Controller
{
    /** @var Shop $shop */
    private $shop;

    public function __construct(ShopManager $shopManager)
    {
        $this->shop = $shopManager->getCurrentShop();
    }

    public function index(FavoriteInterface $favorite)
    {
        $products = Product::whereIn('id', $favorite->all())->paginate(15);

        return view('shop.favorites', compact('products'))
            ->with('shop', $this->shop);
    }

    public function store(StoreFavoriteRequest $request, FavoriteInterface $favorite)
    {
        $exists = $favorite->toggleProduct($request->product_id);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт успешно ' . ($exists ? 'добавлен' : 'удалён') . '.',
            'status' => $exists,
            'count' => $favorite->count()
        ]);
    }
}
