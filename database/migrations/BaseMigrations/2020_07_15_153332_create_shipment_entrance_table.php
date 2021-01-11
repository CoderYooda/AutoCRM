<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShipmentEntranceTable extends Migration
{
    public function up()
    {
        Schema::create('shipment_entrance', function (Blueprint $table) {
            $table->unsignedBigInteger('shipment_id');
            $table->unsignedBigInteger('entrance_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shipment_entrance');
    }
}
