<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefundWarrantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refund_warrant', function (Blueprint $table) {
            $table->bigInteger('warrant_id')->unsigned()->comment('Привязка к операции');
            $table->bigInteger('refund_id')->unsigned()->comment('Привязка к возврату');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refund_warrant');
    }
}
