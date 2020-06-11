<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\DecoderController;
use App\Models\Shipment;
use App\Models\Warrant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $manufacturers = $this->getManufacturerList();

        foreach ($manufacturers->mf as $manufacturer) {
            dd($manufacturer);
        }
    }

    public function getManufacturerList()
    {
        $url = 'https://fapi.iisis.ru/fapi/v2/manufacturerList?';

        $attributes = [
            'ui' => '73fe9d3a-6b61-40f5-a44f-6d1e0183917a', //API ключ
        ];

        $url .= http_build_query($attributes);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $headers = [
            'Content-Type: application/json;',
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);

        curl_close ($ch);

        $response = json_decode($response);

        return $response;
    }
}
