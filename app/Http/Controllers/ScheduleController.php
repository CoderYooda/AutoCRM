<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;

class ScheduleController extends Controller
{
    public function index(Request $request){
        $target = HC::selectTarget();
        if($request->expectsJson() && $request['search'] === NULL){
            $content = view(env('DEFAULT_THEME', 'classic') . '.schedule.index', compact('request'))->render();
            return response()->json([
                'target' => $target,
                'page' => 'Планировщик',
                'html' => $content
            ]);
        } else {
            return view(env('DEFAULT_THEME', 'classic') . '.schedule.index', compact('request'));
        }
    }
}
