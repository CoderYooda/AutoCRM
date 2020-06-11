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
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('providerorder_id')->nullable()->unsigned()->comment('Привязка к Заявкам');
            $table->bigInteger('shipment_id')->nullable()->unsigned()->comment('Привязка к Продажам');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к Сотруднику');
            $table->bigInteger('manager_id')->unsigned()->comment('Принимающий');
            $table->boolean('locked')->default(0)->comment('Заблокировано');
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
