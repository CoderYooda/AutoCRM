<?php

namespace App\Console\Commands;

use App\Models\Partner;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Http\Controllers\SalaryPaymentsController as SPC;

class CalculateSalary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'salary:calculate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Начисление зарплат сотрудников';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $date = Carbon::now();

        $managers = Partner::where('category_id', 5)->get();
        foreach($managers as $manager){
            $data = $manager->getSalary($date);
            $manager->increment('salary_balance', $data[0]);
            SPC::createPayment($data[1]);
        }
    }
}
