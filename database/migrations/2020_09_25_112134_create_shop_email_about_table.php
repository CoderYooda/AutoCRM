<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopEmailAboutTable extends Migration
{
    public function up()
    {
        Schema::create('shop_emails_contact', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id');
            $table->unsignedBigInteger('email_id');
        });

        Schema::table('shop_emails_contact', function (Blueprint $table) {
            $table->foreign('shop_id')->on('shops')->references('id')->onDelete('cascade');
            $table->foreign('email_id')->on('emails')->references('id')->onDelete('cascade');
        });

        Schema::create('shop_emails_order', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id');
            $table->unsignedBigInteger('email_id');
        });

        Schema::table('shop_emails_order', function (Blueprint $table) {
            $table->foreign('shop_id')->on('shops')->references('id')->onDelete('cascade');
            $table->foreign('email_id')->on('emails')->references('id')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_emails_contact');
        Schema::dropIfExists('shop_emails_order');
    }
}
