<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleShipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_shipment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('shipment_id')->unsigned()->comment('Привязка к поступлению');
            $table->integer('count')->unsigned()->comment('Кол - во');
            $table->double('midprice')->unsigned()->nullable()->comment('Цена закупочная');
            $table->char('status')->default('to_ensure')->comment('статус');
            $table->double('price')->unsigned()->comment('Цена');
            $table->double('total')->unsigned()->comment('Цена общая');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_shipment');
    }
}
