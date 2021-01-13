<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderArticleTable extends Migration
{
    public function up()
    {
        Schema::create('order_articles', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->on('orders')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->on('articles')->references('id')->onDelete('cascade');

            $table->integer('count');
            $table->decimal('price', 12, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_articles');
    }
}
