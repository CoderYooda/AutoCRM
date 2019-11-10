<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleProviderOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_provider_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('provider_order_id')->unsigned()->comment('Привязка к поступлению');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->integer('count')->unsigned()->comment('Кол - во');
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
        Schema::dropIfExists('article_provider_orders');
    }
}