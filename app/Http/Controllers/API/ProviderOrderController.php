<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ProviderOrdersController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProviderOrderController extends Controller
{
    public function tableData(Request $request)
    {
        #Получаем список продуктов из поиска
        $products = ProviderOrdersController::getPoviderOrders($request);
        return response()->json($products);
    }
}
