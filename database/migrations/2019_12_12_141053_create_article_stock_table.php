<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleStockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_stock', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->integer('cost')->unsigned()->default(0)->comment('Цена поступления');
            $table->boolean('realized')->default(false)->comment('Реализован?');
            $table->boolean('realized_data')->nullable()->comment('Дата реализации');
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
        Schema::dropIfExists('article_stock');
    }
}
