<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MoneyMoveController extends Controller
{
    public function search(Request $request){
        $content = view('cash.elements.moneymove_list_container', compact('request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-warrant',
        ], 200);
    }
}
