<?php

namespace App\Http\Controllers;

use App\Models\DayOffType;
use App\Models\Partner;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as HC;
use Illuminate\Support\Facades\DB;
use Auth;

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

    public function getSchedules(Request $request)
    {
        $start_date = Carbon::parse($request->start_date)->format('Y-m-d');
        $end_date =  Carbon::parse($request->end_date)->format('Y-m-d');

        $schedules = Schedule::owned()->whereBetween('date', [$start_date, $end_date])->whereIn('partner_id', $request->resources)->get();
        $schedules_data = [];

        foreach($schedules as $schedule){
            $schedules_data[$schedule->date][$schedule->partner_id][] = $schedule;
        }

        return response()->json([
            'schedules_date' => $schedules_data
        ]);
    }

    public function store(Request $request){

        DB::transaction(function() use ($request) {
            $start_date = Carbon::parse($request->start_date)->format('Y-m-d');
            $end_date =  Carbon::parse($request->end_date)->format('Y-m-d');
            $dates = $request->data;
            Schedule::whereBetween('date', [$start_date, $end_date])->whereIn('partner_id', $request->resources)->delete();
            foreach ($dates as $date_str => $date) {
                foreach ($date as $resuorce_str => $resource) {
                    if ($resource != null) {
                        foreach ($resource as $schedule) {
                            Schedule::create([
                                'company_id' => Auth::user()->company->id,
                                'partner_id' => $schedule['partner_id'],
                                'dayType' => $schedule['dayType'],
                                'dayTypeId' => $schedule['dayTypeId'],
                                'dayTypeText' => $schedule['dayTypeText'],
                                'date' => $date_str,
                                'start' => $schedule['start'],
                                'end' => $schedule['end']
                            ]);
                        }
                    }
                }
            }
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Планировщик обновлён'
        ]);
    }
}
