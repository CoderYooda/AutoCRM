<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntrancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    #Переоценка
    public function up()
    {
        Schema::create('entrances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->decimal('totalPrice', 10, 2)->comment('Общая цена');
            $table->integer('count')->comment('Новое кол-во');
            $table->integer('count_before')->comment('Старое кол-во');
            $table->integer('price')->comment('Новая цена');
            $table->integer('price_before')->comment('Старая цена');
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
        Schema::dropIfExists('entrances');
    }
}
