<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ClearTableData extends Migration
{
    public function up()
    {
        DB::table('article_adjustment')->delete();
        DB::table('article_client_orders')->delete();
        DB::table('article_entrance')->delete();
        DB::table('article_entrance_refund')->delete();
        DB::table('article_order')->delete();
        DB::table('article_provider_orders')->delete();
        DB::table('article_refund')->delete();
        DB::table('article_shipment')->delete();
        DB::table('article_store')->delete();

        DB::table('cashboxes')->update(['balance' => 0]);
        DB::table('cashbox_history')->delete();

        DB::table('client_orders')->delete();
        DB::table('entrances')->delete();
        DB::table('entrance_refunds')->delete();
        DB::table('import_history')->delete();
        DB::table('money_move')->delete();
        DB::table('orders')->delete();
        DB::table('provider_orders')->delete();
        DB::table('refund')->delete();
        DB::table('shipments')->delete();
        DB::table('shipment_entrance')->delete();
    }

    public function down()
    {
        //
    }
}
