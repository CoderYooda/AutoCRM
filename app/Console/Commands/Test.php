<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Illuminate\Console\Command;
use mysql_xdevapi\Exception;

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
        $url = "https://online.bbcrm.ru/test?";

        $params = [
            'method' => 'GET',
            'path'=> 'search/articles/',
            'userlogin'=> 'audi-31@yandex.ru',
            'userpsw' => '904fb12b14e1d08af410ec9db5f905d9',
            'number' => 'k1279',
            'useOnlineStocks' => '1',
            'brand' => 'Kashiyama',
            'locale' => 'ru_RU'
        ];

        $query_params = http_build_query($params);

        $handle = curl_init();

        curl_setopt($handle, CURLOPT_URL, $url . $query_params);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($handle);

        $result = (array)json_decode($result);

        curl_close($handle);

        dd($result);
    }
}
