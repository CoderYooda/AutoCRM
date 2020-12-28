<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;
use App\Models\Category;
use GuzzleHttp\Psr7\Request;

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
        $params = [
            'force' => 1,
            'order' => [
                "is_test" => 1,
                "dispatch_type" => 3,
                "dispatch_time" => 1,
                "dispatch_at" => "2013-12-12",
                "person" => "Женя Лукашин",
                "comment" => "запчасти для Ипполита",
                "shipment_address" => "Москва, 3-я улица Строителей, дом 25, квартира 12",
                "items" => [
                    ["resource_id" => 703, "warehouse_id" => 27820, "quantity" => 40, "comment" => "произвольный комментарий 1"],
                    ["resource_id" => 50716, "warehouse_id" => 27, "quantity" => 2, "comment" => "произвольный комментарий 2"],
                    ["resource_id" => 50716, "warehouse_id" => 6, "quantity" => 10, "comment" => "произвольный комментарий 3"]
                ]
            ]
        ];

        $client = new Client();

        $response = $client->request('POST', 'https://api.berg.ru/ordering/place_order', [
            'headers' => [
                'X-Berg-API-Key' => '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e730',
                'Content-Type' => 'application/json'
            ],
            'body' => json_encode($params)
        ]);

        dd($response);
    }
}
