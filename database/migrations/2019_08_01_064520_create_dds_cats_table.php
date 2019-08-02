<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDdsCatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dds_cats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('Наименование категории');
            $table->bigInteger('ddscat_id')->unsigned()->comment('Привязка к категории ддс');
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
        Schema::dropIfExists('dds_cats');
    }
}
