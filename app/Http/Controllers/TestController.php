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
        }
        return $view;
    }

}
