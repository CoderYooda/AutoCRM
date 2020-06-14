<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class FreshDataBase extends Command
{
    protected $signature = 'base:fresh';

    protected $description = 'Фреш базы данных';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Artisan::call('migrate:fresh --path=/database/migrations/BaseMigrations --seed');
        Artisan::call('migrate');
    }
}
