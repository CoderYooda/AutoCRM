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

class Test extends Command
{
    protected $signature = 'command:test';

    protected $description = 'Command description';

    protected $host = 'http://id8341.public.api.abcp.ru/';

    protected $login = 'audi-31@yandex.ru';
    protected $password = 'i7r7o7n7';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $path = 'https://api.autoeuro.ru/api/v-1.0/shop/brands/json/4hhfL7REY7sHFAukNu8159GoFRusPQb88xWYxTofErMEyUShCnUR1fDnlXEo';

        $response = file_get_contents($path);

        $response = json_decode($response, true);

        dd($response);
    }
}
