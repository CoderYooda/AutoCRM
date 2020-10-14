<?php

namespace App\Http\Controllers\Shop;

use App\Models\Article;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function info(Article $product)
    {
        $view = view('shop.modal.product_info', compact('product'));

        return response()->json([
            'html' => $view->render()
        ]);
    }
}
