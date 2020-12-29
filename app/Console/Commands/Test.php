<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;
use App\Models\Category;
use GuzzleHttp\Psr7\Request;
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
        $client = new SoapClient("http://service.autopiter.ru/v2/price?WSDL");

        //http://service.autopiter.ru/v2/price?op=IsAuthorization
        if (!($client->IsAuthorization()->IsAuthorizationResult)) {
            //http://service.autopiter.ru/v2/price?op=Authorization
            //UserID - ваш клиентский id, Password - ваш пароль
            $response = $client->Authorization(array("UserID"=>"882153", "Password"=>"441145", "Save"=> "true"));

            dd($response);
        }
    }
}
