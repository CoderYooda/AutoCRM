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
    protected $signature = 'command:test {article}';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $article = $this->argument('article');

        $manufacturers = AnalogController::getManufacturersByArticle($article);

        $index = 10;

        $part = $manufacturers[$index];

        $this->info('Выбранная деталь ' . $part['m_id'] . ': ' . $part['p_id']);

        $analogues = AnalogController::getAnalogues($article, $manufacturers[$index]['m_id']);

        dd($analogues);
    }
}
