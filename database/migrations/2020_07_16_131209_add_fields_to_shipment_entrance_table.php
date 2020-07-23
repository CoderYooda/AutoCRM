<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToShipmentEntranceTable extends Migration
{
    public function up()
    {
        Schema::table('shipment_entrance', function (Blueprint $table) {
            $table->unsignedBigInteger('article_id');
            $table->integer('count');
        });
    }

    public function down()
    {
        Schema::table('shipment_entrance', function (Blueprint $table) {
            $table->dropColumn('article_id');
            $table->dropColumn('count');
        });
    }
}
