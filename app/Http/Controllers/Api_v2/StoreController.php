<?php

namespace App\Http\Controllers\Api_v2;

use App\Http\Controllers\ProductController;
use App\Http\Requests\StoreGetRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
    public function tableData(StoreGetRequest $request)
    {
        #Получаем список продуктов из поиска
        $products = ProductController::getArticles($request);
        return response()->json($products);
    }
}
