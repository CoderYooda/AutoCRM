<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;
use Auth;

class ProductController extends Controller
{


    public function index(Request $request)
    {
        $page_title = 'Товары и склад';

        $target = HC::selectTarget();

        if($request['active_tab'] === NULL){
            $request['active_tab'] = 'store';
        }


        $products = Article::all();



        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('product.' . $request['active_tab'], compact('products', 'request'))->render();
            return response()->json(['target' => $target ,'page' => $page_title, 'content' => $content]);
        } else {
            return view('product.' . $request['active_tab'], compact('products', 'request'));
        }
    }
}
