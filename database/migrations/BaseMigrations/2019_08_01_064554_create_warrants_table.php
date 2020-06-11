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
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->bigInteger('cashbox_id')->unsigned()->comment('Привязка к кассовому аппарату');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к контрагенту');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к менеджеру');
            $table->bigInteger('ddsarticle_id')->unsigned()->comment('Привязка к кассовому аппарату');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            //$table->char('move_to')->nullable()->comment('Куда выводить');
            $table->double('summ', 12, 2)->comment('Сумма операции с двойной точностью');
            $table->char('reason')->nullable()->comment('Причина');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->boolean('isIncoming')->comment('Входящая или исходящая операция');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
            $table->char('payable_type')->nullable()->comment('Привязанная сущность');
            $table->bigInteger('payable_id')->unsigned()->nullable()->comment('ID привязанной сущности');
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
