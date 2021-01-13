<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleSpecificationsTable extends Migration
{
    public function up()
    {
        Schema::create('specifications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->on('articles')->references('id')->onDelete('cascade');
            $table->string('name');
            $table->string('label');
            $table->string('value');
        });
    }

    public function down()
    {
        Schema::dropIfExists('specifications');
    }
}
