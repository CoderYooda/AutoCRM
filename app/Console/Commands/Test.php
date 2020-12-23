<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;

class Test extends Command
{
    protected $signature = 'command:test';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Category::rebuild();

        dd(1);
    }
}
