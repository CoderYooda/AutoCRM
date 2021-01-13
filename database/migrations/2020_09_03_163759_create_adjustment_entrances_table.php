<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdjustmentEntrancesTable extends Migration
{
    public function up()
    {
        Schema::create('adjustment_article_entrance', function (Blueprint $table) {

            $table->unsignedBigInteger('adjustment_id');
            $table->foreign('adjustment_id')->on('adjustments')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('article_entrance_id');
            $table->foreign('article_entrance_id')->on('article_entrance')->references('id')->onDelete('cascade');

            $table->integer('count');
        });
    }

    public function down()
    {
        Schema::dropIfExists('adjustment_article_entrance');
    }
}
