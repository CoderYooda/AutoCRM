<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleEntranceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_entrance', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('entrance_id')->unsigned()->comment('Привязка к поступлению');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к поступлению');
            $table->integer('count')->unsigned()->comment('Кол - во');
            $table->double('price')->unsigned()->comment('Цена');
            $table->double('total')->unsigned()->comment('Цена общая');
            $table->double('nds_percent')->unsigned()->comment('% ндс');
            $table->double('nds')->unsigned()->comment('ндс');
            $table->boolean('nds_included')->unsigned()->comment('ндс в стоимости?');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_entrance');
    }
}
