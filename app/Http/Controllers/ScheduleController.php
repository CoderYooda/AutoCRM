<?php

namespace App\Http\Controllers;

use App\Models\DayOffType;
use App\Models\Partner;
use App\Models\Schedule;
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

    public function getSchedules(Request $request){
        $schedules = Schedule::all();
        $schedules_data = [];

        foreach($schedules as $schedule){
            $schedules_data[$schedule->partner_id][] = $schedule;
        }


        $resources = Partner::owned()->where('category_id', 5)->get();
        $data = [];
        foreach($resources as $resource){
            //$data[$resource->id] =
        }


        return response()->json([
            'schedules' => $schedules
        ]);
    }
}
