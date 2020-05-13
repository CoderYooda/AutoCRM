<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Company;

class DecreasePayedDays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'companies:decrease_p_d';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Отнять у всех компаний 1 оплаченый день';

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
        $companies = Company::all();
        foreach($companies as $company){
            if($company->payed_days > 0) {
                $company->decrement('payed_days');
            } else {
                $company->blocked = true;
                $company->save();
            }
        }
    }
}
