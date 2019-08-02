<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDdsArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dds_articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('dds_type_id')->unsigned()->comment('Привязка к типу движения денежных средств');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('ddscat_id')->unsigned()->comment('Привязка к категории ддс');
            $table->char('name')->comment('Наименование');
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
        Schema::dropIfExists('dds_articles');
    }
}
