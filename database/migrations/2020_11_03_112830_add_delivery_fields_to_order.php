<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDeliveryFieldsToOrder extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->integer('delivery_type')->default(0);
            $table->unsignedBigInteger('delivery_id')->nullable();
            $table->unsignedBigInteger('pickup_id')->nullable();
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('delivery_type');
            $table->dropColumn('delivery_id');
            $table->dropColumn('pickup_id');
        });
    }
}
