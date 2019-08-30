<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EntranceController extends Controller
{
    public static function addEntranceDialog($request)
    {
        //$parent = Category::where('id', $start_category_id)->first();
        return response()->json(['tag' => 'createEntrance', 'html' => view('product.elements.entrance.dialog.form_entrance', compact('parent'))->render()]);
    }

    public function store(Request $request){
        dd(1);
    }
}
