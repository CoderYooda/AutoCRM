<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmailsTable extends Migration
{
    public function up()
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('email');
            $table->string('desc');
            $table->integer('main');

            $table->unsignedBigInteger('emailable_id');
            $table->string('emailable_type');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('emails');
    }
}
