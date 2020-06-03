<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehiclesTable extends Migration
{
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('partner_id')->nullable();
            $table->foreign('partner_id')->on('partners')->references('id')->onDelete('cascade');

            $table->unsignedBigInteger('mark_id');
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('modify_id');
            $table->string('color')->nullable();
            $table->string('type')->nullable();
            $table->string('vin_code')->nullable();
            $table->integer('year')->nullable();
            $table->string('numberplate')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
