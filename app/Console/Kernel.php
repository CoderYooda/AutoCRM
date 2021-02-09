<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{

    protected $commands = [
        Commands\SystemMessage::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        $schedule->command('salary:calculate')->everyMinute();
        $schedule->command('product:stock')->daily();
        //$schedule->command('salary:calculate')->dailyAt('23:55');
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
