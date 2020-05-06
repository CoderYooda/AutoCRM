<?php

namespace App\Console\Commands;

use App\Models\Statistic;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ExpensesManagerPerDay extends Command
{
    protected $signature = 'command:expenses-partner-per-day';

    protected $description = 'Формирование затрат партнера за день.';

    public function handle()
    {

    }
}
