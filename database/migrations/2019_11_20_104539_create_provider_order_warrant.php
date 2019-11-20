<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProviderOrderWarrant extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provider_order_warrant', function (Blueprint $table) {
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('warrant_id')->unsigned()->comment('Привязка к операции');
            $table->bigInteger('providerorder_id')->unsigned()->comment('Привязка к заказу поставщика');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('provider_order_warrant');
    }
}
