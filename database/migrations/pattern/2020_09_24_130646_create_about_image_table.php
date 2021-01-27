<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAboutImageTable extends Migration
{
    public function up()
    {
        Schema::create('shop_images_about', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('shop_id')->nullable();
            $table->unsignedBigInteger('image_id')->nullable();
        });

        Schema::table('shop_images_about', function (Blueprint $table) {
            $table->foreign('shop_id')->on('shops')->references('id')->onDelete('cascade');
            $table->foreign('image_id')->on('images')->references('id')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_images_about');
    }
}
