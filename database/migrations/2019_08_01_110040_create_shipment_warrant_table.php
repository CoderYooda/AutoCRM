<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShipmentWarrantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipment_warrant', function (Blueprint $table) {
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('warrant_id')->unsigned()->comment('Привязка к операции');
            $table->bigInteger('shipment_id')->unsigned()->comment('Привязка к продаже');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipment_warrant');
    }
}
