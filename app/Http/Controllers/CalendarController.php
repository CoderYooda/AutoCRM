<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;

class CalendarController extends Controller
{
    public function index(Request $request){
        $target = HC::selectTarget();
        if($request->expectsJson() && $request['search'] === NULL){
            $content = view('calendar.index', compact('request'))->render();
            return response()->json([
                'target' => $target,
                'page' => 'Календарь',
                'html' => $content
            ]);
        } else {
            return view('calendar.index', compact('request'));
        }
    }

}
