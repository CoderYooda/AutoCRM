<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveDepricatedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('adjustment_article_entrance');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('adjustment_article_entrance', function (Blueprint $table) {

            $table->unsignedBigInteger('adjustment_id');
            $table->foreign('adjustment_id')->on('adjustments')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('article_entrance_id');
            $table->foreign('article_entrance_id')->on('article_entrance')->references('id')->onDelete('cascade');

            $table->decimal('price', 12, 2);

            $table->integer('count');
        });
    }
}
