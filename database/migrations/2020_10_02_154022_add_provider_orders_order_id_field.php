<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProviderOrdersOrderIdField extends Migration
{
    public function up()
    {
        Schema::table('provider_orders', function (Blueprint $table) {
            $table->unsignedBigInteger('api_order_id');
        });
    }

    public function down()
    {
        Schema::table('provider_orders', function (Blueprint $table) {
            $table->dropColumn('api_order_id');
        });
    }
}
