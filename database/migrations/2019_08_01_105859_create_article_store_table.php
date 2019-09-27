<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleStoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_store', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->nullable()->comment('Привязка к товару');
            $table->bigInteger('store_id')->unsigned()->nullable()->comment('Привязка к товару');
            $table->char('location')->nullable()->comment('Описание места на складе');
            $table->integer('count')->unsigned()->nullable()->default(0)->comment('Колличество');
            $table->integer('reserved')->unsigned()->nullable()->default(0)->comment('Зарезервировано');
            $table->boolean('isset')->unsigned()->nullable()->default(0)->comment('Включен в склад?');
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
        Schema::dropIfExists('article_store');
    }
}
