<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ProductController;
use App\Http\Requests\StoreGetRequest;
use App\Models\Category;
use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
    public function show()
    {
        $stores = Store::owned()->get();
        return $stores;
    }


    public function tableData(StoreGetRequest $request)
    {
        #Получаем список продуктов из поиска
        $products = ProductController::getArticles($request);
        return response()->json($products);
    }
}
