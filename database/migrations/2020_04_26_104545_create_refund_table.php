<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefundTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refund', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к менеджеру');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к покупателю');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->bigInteger('shipment_id')->unsigned()->nullable()->comment('Привязка к заказу');
            $table->decimal('summ', 12, 2)->comment('Общая цена');
            $table->char('comment')->nullable()->comment('Комментарий');
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
        Schema::dropIfExists('refund');
    }
}
