<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntranceWarrantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entrance_warrant', function (Blueprint $table) {
            $table->bigInteger('warrant_id')->unsigned()->comment('Привязка к операции');
            $table->bigInteger('entrance_id')->unsigned()->comment('Привязка к поступлению');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entrance_warrant');
    }
}
