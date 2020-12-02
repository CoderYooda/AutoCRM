<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\EntranceController as EC;

class EntranceController extends Controller
{
    public function tableData(Request $request)
    {
        $products = EC::getEntrances($request);
        return response()->json($products);
    }
}
