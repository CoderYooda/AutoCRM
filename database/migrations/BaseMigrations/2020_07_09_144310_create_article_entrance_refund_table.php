<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleEntranceRefundTable extends Migration
{
    public function up()
    {
        Schema::create('article_entrance_refund', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('entrance_id')->unsigned()->comment('Привязка к поступлению');
            $table->bigInteger('store_id')->nullable()->unsigned()->comment('Привязка к складу');
            $table->integer('count')->nullable()->unsigned()->comment('Кол - во');
            $table->double('price')->nullable()->unsigned()->comment('Цена');
            $table->double('total')->nullable()->unsigned()->comment('Цена общая');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('article_entrance_refund');
    }
}
