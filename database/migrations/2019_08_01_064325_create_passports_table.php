<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePassportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passports', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned();
            $table->bigInteger('number')->nullable()->unsigned()->comment('Номер паспорта');
            $table->char('issued_by')->nullable()->comment('Выдан');
            $table->date('issued_date')->nullable()->comment('Дата выдачи');
            $table->char('issued_place')->nullable()->comment('Место выдачи');
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
        Schema::dropIfExists('passports');
    }
}
