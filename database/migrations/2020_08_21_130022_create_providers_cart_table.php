<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProvidersCartTable extends Migration
{
    public function up()
    {
        Schema::create('providers_cart', function (Blueprint $table) {

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->on('users')->references('id')->onDelete('cascade');

            $table->string('delivery_key');
            $table->string('provider_key');
            $table->string('manufacturer');
            $table->string('article');
            $table->integer('count');
            $table->decimal('price', 12, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('providers_cart');
    }
}
