<?php

namespace App\Console\Commands;

use App\Models\Partner;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\Article;
use SoapClient;

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
