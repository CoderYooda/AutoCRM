<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClearCarts extends Command
{
    protected $signature = 'cart:clear';

    protected $description = 'Clear all cart of users.';

    public function handle()
    {

    }
}
