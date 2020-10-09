<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index(Request $request){
        $view = view('shop.index');

        switch ($request->page){
            case 'about':
                $view = view('shop.about-company');
                break;
            case 'catalogue':
                $view = view('shop.catalogue');
                break;
            case 'contacts':
                $view = view('shop.contacts');
                break;
            case 'deliver':
                $view = view('shop.deliver');
                break;
            case 'refund':
                $view = view('shop.refund');
                break;
            case 'category':
                $view = view('shop.category');
                break;
            case 'login':
                $view = response()->json([
                    'html' => view('shop.auth')->render()
                ], 200);
                break;
            case 'product':
                $view = view('shop.product');
                break;
            case 'garage':
                $view = view('shop.garage');
                break;
        }
        return $view;
    }



}
