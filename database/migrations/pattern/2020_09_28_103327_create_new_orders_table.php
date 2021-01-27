<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewOrdersTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('orders');

        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('partner_id');
            $table->foreign('partner_id')->on('partners')->references('id')->onDelete('cascade');

            $table->decimal('total_price', 12, 2);

            $table->integer('status')->default(0);

            $table->text('comment')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');

        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->decimal('totalPrice', 10, 2)->comment('Общая цена');
            $table->integer('discount')->comment('Скидка');
            $table->boolean('inpercents')->comment('В процентах?');
            $table->timestamps();
        });
    }
}
