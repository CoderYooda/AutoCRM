<?php

namespace App\Http\Controllers\Shop;

use App\Models\Shop;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index($subdomain)
    {
        $shop = Shop::where('subdomain', $subdomain)->first();

        abort_if(!$shop, 404);

        return view('shop.category', compact('shop'));
    }
}
