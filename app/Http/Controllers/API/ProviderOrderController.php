<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ProviderOrdersController;
use App\Models\ProviderOrder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProviderOrderController extends Controller
{
    public function show(ProviderOrder $providerOrder){
        return $providerOrder->load('articles', 'store', 'partner');
    }

    public function tableData(Request $request)
    {
        #Получаем список продуктов из поиска
        $products = ProviderOrdersController::getPoviderOrders($request);
        return response()->json($products);
    }
}
