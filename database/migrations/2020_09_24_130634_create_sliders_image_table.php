<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSlidersImageTable extends Migration
{
    public function up()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->bigIncrements('id')->change();
        });

        Schema::create('shop_images_slider', function (Blueprint $table) {

            $table->bigIncrements('id');

            $table->unsignedBigInteger('shop_id');
            $table->unsignedBigInteger('image_id');
        });

        Schema::table('shop_images_slider', function (Blueprint $table) {
            $table->foreign('shop_id')->on('shops')->references('id')->onDelete('cascade');
            $table->foreign('image_id')->on('images')->references('id')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_images_slider');
    }
}
