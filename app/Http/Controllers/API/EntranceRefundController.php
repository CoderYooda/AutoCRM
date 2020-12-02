<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\EntranceRefundController as ER;

class EntranceRefundController extends Controller
{
    public function tableData(Request $request)
    {
        $products = ER::getEntranceRefunds($request);
        return response()->json($products);
    }
}
