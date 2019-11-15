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
            $table->bigInteger('providerorder_id')->unsigned()->comment('Привязка к Заявкам');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->decimal('totalPrice', 10, 2)->comment('Общая цена');
            $table->boolean('locked')->comment('Замок');
            $table->text('comment')->nullable()->comment('Комментарий');
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
