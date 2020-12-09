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
//        $path = 'https://api.autoeuro.ru/api/v-1.0/shop/stock_items/json/4hhfL7REY7sHFAukNu8159GoFRusPQb88xWYxTofErMEyUShCnUR1fDnlXEo?';
//
//        $params = [
//            'code' => 'k1279',
////            'brand' => 'RUVILLE',
//            'with_crosses' => 1
//        ];
//
//        $params = http_build_query($params);
//
//        $response = file_get_contents($path . $params);
//
//        $response = json_decode($response, true);
//
//        dd($response);

        $client = new SoapClient('https://api.forum-auto.ru/wsdl', ["exceptions" => false]);

        // Выполнение запроса к серверу API Форум-Авто

        $result = $client->listGoods('485977_bordyan', 'BJpUgRHkqS', 'k1279', 1);

        if (is_soap_fault($result)) {

            // Обработка ошибки

            echo "SOAP Fault: (faultcode: {$result->faultcode}, faultstring: {$result->faultstring}, detail: {$result->detail})";

        } else {

            // Результат запроса

            echo '<pre>' . var_export($result, true) . '</pre>';

        }
    }
}
