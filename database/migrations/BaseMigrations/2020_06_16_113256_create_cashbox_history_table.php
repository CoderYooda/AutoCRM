<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCashboxHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cashbox_history', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('cashbox_id');
            $table->foreign('cashbox_id')->references('id')->on('cashboxes')->onDelete('cascade');
            $table->decimal('balance', 12, 2);
            $table->string('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cashbox_history');
    }
}
