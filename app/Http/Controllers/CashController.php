<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Warrant;
use Illuminate\Http\Request;

class CashController extends Controller
{
    public function index(Request $request){

        $page_title = 'Деньги';

        $target = HC::selectTarget(); // цель ajax подгрузки

        if($request['active_tab'] === NULL || $request['active_tab'] == 'undefined'){ // Определяем табуляцию
            $request['active_tab'] = 'money';
        }

        $classname = $request['active_tab'] . 'Tab';
//        $content = view('cash.operations', compact('products', 'request'));
        $content = self::$classname($request);

        if($request['view_as'] != null && $request['view_as'] == 'json'){
            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'class' => 'Cash',
                'content' => $content->render()
            ]);
        } else {
            return $content;
        }
    }

    public static function moneyTab($request)
    {
        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('cash.operations', compact('request'));
        }
        return view('cash.operations', compact('request'));
    }

    public static function cashmoveTab($request)
    {
        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('cash.operations', compact('request'));
        }
        return view('cash.operations', compact('request'));
    }
}
