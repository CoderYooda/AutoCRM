<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProvidersCartOrders extends Migration
{
    public function up()
    {
        Schema::create('providers_cart_orders', function (Blueprint $table) {

            $table->bigIncrements('id');

            $table->string('service_key');

            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->on('companies')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->on('users')->references('id')->onDelete('cascade');

            $table->integer('number');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('providers_cart_orders');
    }
}
