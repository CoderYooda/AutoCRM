<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Schedule;

class ScheduleSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fake_user = \App\Models\User::where('id', 2)->first();
        Auth::login($fake_user);

        $now = Carbon::now();

        $resourcesIds = \App\Models\Partner::owned()->where('category_id', 5)->get()->pluck('id');
        $dayTypeIds = \App\Models\DayOffType::all()->pluck('id');

        //dd($resourcesIds);

        for($i = 0; $i < 365; $i++) {
            for($r = 0; $r < 4; $r++) {
                $dayType = rand(0, 1) ? 'work' : 'free';


                $schedule = new Schedule();
                $schedule->company_id = Auth::user()->company_id;
                $schedule->partner_id = rand(1, count($resourcesIds));
                $schedule->dayType = $dayType;
                if ($dayType === 'free') {
                    $schedule->dayTypeId = rand(1, count($dayTypeIds));
                    $schedule->dayTypeText = \App\Models\DayOffType::where('id', $schedule->dayTypeId)->first()->type;
                }
                $schedule->date = Carbon::now()->addDays($i);
                $schedule->start = Carbon::now()->addDays($i)->addHours(rand(1, 24))->subMinutes(rand(1, 55));
                $schedule->end = Carbon::now()->addDays($i)->addHours(rand(1, 24))->subMinutes(rand(1, 55));

                $schedule->save();
            }
        }
    }
}
