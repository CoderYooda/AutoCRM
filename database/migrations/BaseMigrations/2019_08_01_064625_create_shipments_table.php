<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к менеджеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->bigInteger('clientorder_id')->unsigned()->nullable()->comment('Привязка к заказу');
            $table->char('foundstring', 255)->default(0)->comment('Строка поиска');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->decimal('summ', 12, 2)->comment('Общая цена');
            $table->decimal('itogo', 12, 2)->comment('Итоговая цена');
            $table->integer('discount')->comment('Скидка');
            $table->boolean('inpercents')->comment('В процентах?');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
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
        Schema::dropIfExists('shipments');
    }
}
