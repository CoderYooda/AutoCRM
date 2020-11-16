<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class ClearTables extends Migration
{
    public function up()
    {
        DB::table('adjustments')->delete();
        DB::table('article_adjustment')->delete();
        DB::table('article_client_orders')->delete();
        DB::table('article_entrance')->delete();
        DB::table('article_entrance_refund')->delete();
        DB::table('article_order')->delete();
        DB::table('article_provider_orders')->delete();
        DB::table('article_refund')->delete();
        DB::table('article_shipment')->delete();
        DB::table('cashboxes')->update(['balance' => 0]);
        DB::table('cashbox_history')->delete();
        DB::table('client_orders')->delete();
        DB::table('delivery_addresses')->delete();
        DB::table('documents')->delete();
        DB::table('entrances')->delete();
        DB::table('entrance_refunds')->delete();
        DB::table('exceptions')->delete();
        DB::table('failed_jobs')->delete();
        DB::table('money_move')->delete();
        DB::table('orders')->delete();
        DB::table('order_positions')->delete();
        DB::table('partners')->update(['balance' => 0]);
        DB::table('providers_cart')->delete();
        DB::table('providers_cart_orders')->delete();
        DB::table('provider_orders')->delete();
        DB::table('refund')->delete();
        DB::table('shipments')->delete();

        Schema::dropIfExists('partner_types');

        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropColumn('fapi_id');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('fapi_id');
        });
    }

    public function down()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->unsignedBigInteger('fapi_id');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->unsignedBigInteger('fapi_id');
        });
    }
}
