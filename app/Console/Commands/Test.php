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

        $params = [
            'Search_Code' => 'k1279',
            'ClientID'  => '25288',
            'Password'  => '9524245038',
            'FromStockOnly'  => 'FromStockAndByOrder'
        ];

        $header = "Content-Type: application/x-www-form-urlencoded";

        $handle = curl_init();

        curl_setopt($handle, CURLOPT_URL, 'https://mikado-parts.ru/ws1/service.asmx/Code_Search');
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle,CURLOPT_FOLLOWLOCATION,TRUE);
        curl_setopt($handle, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
        curl_setopt($handle, CURLOPT_POSTFIELDS, http_build_query($params));
        $result = curl_exec($handle);

        curl_close($handle);

        $brands = simplexml_load_string($result);

        foreach ($brands->List->Code_List_Row as $brand) {
            dd($brand);
        }

    }
}
