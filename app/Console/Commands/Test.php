<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\AnalogController;
use App\Http\Controllers\API\DecoderController;
use App\Models\Shipment;
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

    public function handle()
    {
        $article = 'k1279';

        $attributes = [
            'n' => $article,
//            'mfi' => $m_id,
        ];

        $response = self::makeRequest('analogList', $attributes);

        dd($response);
    }

    public static function makeRequest(string $method, array $params = [])
    {
        $url = 'https://fapi.iisis.ru/fapi/v2/' . $method . '?';

        $params['ui'] = '73fe9d3a-6b61-40f5-a44f-6d1e0183917a';

        $url .= http_build_query($params);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $headers = [
            'Content-Type: application/json;',
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);

        curl_close($ch);

        return json_decode($response);
    }
}
