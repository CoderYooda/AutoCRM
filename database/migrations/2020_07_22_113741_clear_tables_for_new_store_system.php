<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class ClearTablesForNewStoreSystem extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
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
        DB::table('client_orders')->delete();
        DB::table('cashbox_history')->delete();
        DB::table('entrances')->delete();
        DB::table('entrance_refunds')->delete();
        DB::table('money_move')->delete();
        DB::table('orders')->delete();
        DB::table('refund')->delete();
        DB::table('shipments')->delete();
        DB::table('shipment_entrance')->delete();
        DB::table('user_actions')->delete();
        DB::table('warrants')->delete();

        DB::table('partners')->update(['balance' => 0]);
        DB::table('cashboxes')->update(['balance' => 0]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
