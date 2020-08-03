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
        $url = "http://ws.armtek.ru/api/ws_user/getUserVkorgList?format=json";

        $result = file_get_contents($url, null, stream_context_create(array(
            'http' => array(
                'method' => 'GET',
                'header' => 'Content-Type: application/json' . "\r\n"
                    . 'Authorization: Basic '. base64_encode("WEBCFIRE.VOSTOK@MAIL.RU:ng2pP4R1zZz") . "\r\n",
            ),
        )));

        $result = json_decode($result);

        dd($result);
    }
}
