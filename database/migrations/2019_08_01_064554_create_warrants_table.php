<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWarrantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('warrants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('do_date')->comment('Дата исполнения');
            $table->bigInteger('cashbox_id')->unsigned()->comment('Привязка к кассовому аппарату');
            $table->bigInteger('ddsarticle_id')->unsigned()->comment('Привязка к кассовому аппарату');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->double('summ', 10, 2)->comment('Сумма операции с двойной точностью');
            $table->char('reason')->comment('Причина');
            $table->char('comment')->comment('Комментарий');
            $table->boolean('isIncoming')->comment('Входящая или исходящая операция');
            $table->boolean('balance')->comment('Остаток в кассе после выполнения операции');
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
        Schema::dropIfExists('warrants');
    }
}
