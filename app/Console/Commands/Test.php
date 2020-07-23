<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\AnalogController;
use App\Http\Controllers\API\DecoderController;
use App\Models\EntranceRefund;
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

    public function handle()
    {
        DB::table('shipment_entrance')->delete();
        DB::table('article_shipment')->delete();
        DB::table('entrances')->delete();
        DB::table('refund')->delete();
        DB::table('article_adjustment')->delete();
        DB::table('client_orders')->delete();
        DB::table('article_refund')->delete();
        DB::table('article_client_orders')->delete();
        DB::table('article_store')->delete();
        DB::table('article_entrance_refund')->delete();
        DB::table('entrance_refunds')->delete();
        DB::table('article_shipment')->delete();
        DB::table('shipments')->delete();
        DB::table('article_entrance')->delete();
    }
}
