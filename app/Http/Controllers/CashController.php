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
            $request['active_tab'] = 'warrant';
        }
        $classname = $request['active_tab'] . 'Tab';
        if($request['active_tab'] === 'null'){$classname = 'moneyTab';}
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

    public static function warrantTab($request)
    {
        $income =  WarrantController::getIncomeCount($request);
        $outcome = WarrantController::getOutcomeCount($request);

        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('cash.warrants', compact('income','outcome', 'request'));
        } else {
            return view('cash.warrants', compact('income', 'outcome', 'request'));
        }

    }

    public static function cashmoveTab($request)
    {
        $income =  WarrantController::getIncomeCount($request);
        $outcome = WarrantController::getOutcomeCount($request);

        if($request['view_as'] == 'json' && $request['search'] != NULL && $request['target'] == 'ajax-table'){
            return view('cash.cashmove', compact('income','outcome','request'));
        }
        return view('cash.cashmove', compact('income','outcome', 'request'));
    }
}
