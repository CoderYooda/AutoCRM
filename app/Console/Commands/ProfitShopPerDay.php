<?php

namespace App\Console\Commands;

use App\Models\Statistic;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ProfitShopPerDay extends Command
{
    protected $signature = 'command:profit-shop-per-day';

    protected $description = 'Формирование прибыли магазина за день.';

    public function handle()
    {
        $warrants = DB::table('warrants')
            ->selectRaw('SUM(summ) as amount, company_id')
            ->where('isIncoming', 1)
            ->orderBy('company_id')
            ->get();

        $queries = [];

        foreach ($warrants as $warrant) {
            $this->info('[Expenses] Компания[' . $warrant->company_id . '], прибыль: ' . $warrant->amount);

            $queries[] = [
                'company_id' => $warrant->company_id,
                'amount' => $warrant->amount,
                'desc' => 'Прибыль магазина',
                'created_at' => Carbon::now()
            ];
        }

        Statistic::insert($queries);

        $this->info('Всего создано записей: ' . count($queries));
    }
}
