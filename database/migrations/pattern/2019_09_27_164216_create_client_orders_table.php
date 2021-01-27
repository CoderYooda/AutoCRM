<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->decimal('summ', 10, 2)->comment('Общая цена');
            $table->decimal('itogo', 12, 2)->comment('Итоговая цена');
            $table->integer('discount')->comment('Скидка');
            $table->string('phone')->nullable();
            $table->boolean('inpercents')->comment('В процентах?');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
            $table->char('status')->default('active')->comment('Статус заказа');
            $table->char('color')->nullable()->comment('Маркировка');
            $table->double('wsumm')->default(0.00)->comment('Оплаченная сумма');
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
        Schema::dropIfExists('client_orders');
    }
}
