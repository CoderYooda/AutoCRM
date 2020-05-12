<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('orderId')->nullable();
            $table->unsignedBigInteger('company_id')->comment('Привязка к компании');
            $table->unsignedInteger('add_days')->comment('Прибавлено дней');
            $table->unsignedInteger('add_balance')->comment('Прибавлено денег');
            $table->unsignedBigInteger('partner_id')->comment('Привязка к Плательщику');
            $table->bigInteger('paymentId')->nullable()->comment('ID оплаты');
            $table->bigInteger('amount')->nullable()->comment('Сумма в копейках');
            $table->char('paymentUrl')->nullable()->comment('Ссылка для оплаты');
            $table->text('response')->nullable()->comment('Ответ банка');
            $table->char('status')->nullable()->comment('Статус');
            $table->text('token')->nullable()->comment('Токен');
            $table->char('error')->nullable()->comment('Ошибка');
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
        Schema::dropIfExists('payment');
    }
}
