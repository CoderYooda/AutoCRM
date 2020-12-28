<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteArticleStockTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('article_stock');
    }

    public function down()
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
}
