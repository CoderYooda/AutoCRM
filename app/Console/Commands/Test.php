<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\AnalogController;
use App\Http\Controllers\API\DecoderController;
use App\Models\Shipment;
use App\Models\User;
use App\Models\Warrant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\SystemMessage as SM;
use App\Events\SystemMessage;

class Test extends Command
{
    protected $signature = 'command:test';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    private $base_url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs";
    private $token;
    private $handle;

    public function handle()
    {
        $fields = [
            'query' => '312181691267',
            'count' => 1
        ];

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party");
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($handle, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Accept: application/json",
            "Authorization: Token 650d1fbb633516d9a2ed473832d4939c9e176640",
        ));
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_POSTFIELDS, json_encode($fields));

        $result = curl_exec($handle);
        $info = curl_getinfo($handle);

        curl_close($handle);

        $result = json_decode($result);

        $suggestion = collect($result->suggestions)->first();

        $response = [
            'opf' => [
                'short' => $suggestion->data->opf->short,
                'full' => $suggestion->data->opf->full
            ],
            'inn' => $suggestion->data->inn,
            'ogrn' => $suggestion->data->ogrn,
        ];

        dd($result);

        return $result;
    }
}
