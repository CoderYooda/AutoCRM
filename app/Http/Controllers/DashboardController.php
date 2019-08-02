<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Article;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request){

        $products = Article::all();
        $target = HC::selectTarget();

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('dashboard.statistic', compact('products', 'request'))->render();
            return response()->json(['target' => $target ,'content' => $content]);
        } else {
            return view('dashboard.statistic', compact('products', 'request'));
        }
    }
}
