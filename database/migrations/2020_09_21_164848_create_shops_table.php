<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopsTable extends Migration
{
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {

            $table->bigIncrements('id');

            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->on('companies')->references('id')->onDelete('cascade');

            $table->string('name')->nullable();
            $table->text('address_name')->nullable();
            $table->text('about_desc')->nullable();
            $table->text('delivery_desc')->nullable();
            $table->text('warranty_desc')->nullable();
            $table->string('address_coords')->nullable();
            $table->string('address_desc')->nullable();

            $table->unsignedBigInteger('image_logotype_id')->nullable();
            $table->unsignedBigInteger('image_header_id')->nullable();
            $table->unsignedBigInteger('image_background_id')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
