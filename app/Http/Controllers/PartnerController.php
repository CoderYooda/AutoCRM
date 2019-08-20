<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Article;
use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();
        $partners = Partner::all();
        $categories = CategoryController::getCategories($request, 'partner');

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            $content = view('partner.index', compact('partners', 'categories', 'request'))->render();
            return response()->json(['target' => $target , 'page' => 'Контрагенты', 'content' => $content]);
        } else {
            return view('partner.index', compact('partners','categories', 'request'));
        }

    }
}
