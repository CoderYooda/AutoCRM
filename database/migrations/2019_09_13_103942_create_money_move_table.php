<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMoneyMoveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('money_move', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->bigInteger('out_cashbox_id')->unsigned()->comment('Привязка к кассовому аппарату1');
            $table->bigInteger('in_cashbox_id')->unsigned()->comment('Привязка к кассовому аппарату2');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->double('summ', 12, 2)->comment('Сумма операции с двойной точностью');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
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
        Schema::dropIfExists('money_move');
    }
}
