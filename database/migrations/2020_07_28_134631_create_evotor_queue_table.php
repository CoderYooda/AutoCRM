<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEvotorQueueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evotor_queue', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('cashbox_id');
            $table->bigInteger('warrant_id');
            $table->integer('tries')->default(0);
            $table->boolean('sended')->default(0);
            $table->boolean('complited')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evotor_queue');
    }
}
