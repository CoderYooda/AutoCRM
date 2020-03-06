<?php

namespace App\Http\Controllers;

use App\Models\DayOffType;
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

    public static function scheduleTemplateDialog($request)
    {
        $day_off_types = DayOffType::all();
        //$partners = Partner::where('company_id', Auth::user()->company()->first()->id)->paginate(7);
        return response()->json([
            'tag' => 'scheduleTemplateDialog',
            'html' => view(env('DEFAULT_THEME', 'classic') . '.schedule.dialog.select_day_type', compact('request', 'day_off_types'))->render()
        ]);
    }
}
