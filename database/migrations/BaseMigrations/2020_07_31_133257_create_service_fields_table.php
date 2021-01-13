<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceFieldsTable extends Migration
{
    public function up()
    {
        Schema::create('service_fields', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('service_id');
            $table->string('name');
            $table->string('placeholder');
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_fields');
    }
}
