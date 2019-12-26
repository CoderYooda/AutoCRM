<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleAdjustmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_adjustment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('adjustment_id')->unsigned()->comment('Привязка к корректировке');
            $table->bigInteger('store_id')->nullable()->unsigned()->comment('Привязка к складу');
            $table->integer('count')->nullable()->unsigned()->comment('Кол - во');
            $table->integer('prev_count')->nullable()->comment('Кол - во');
            $table->integer('deviation_count')->nullable()->comment('Отклонение кол-ва');
            $table->double('price')->nullable()->unsigned()->comment('Цена');
            $table->double('prev_price')->nullable()->unsigned()->comment('Цена');
            $table->integer('deviation_price')->nullable()->comment('Отклонение цены');
            $table->double('total')->nullable()->unsigned()->comment('Цена общая');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_adjustment');
    }
}
