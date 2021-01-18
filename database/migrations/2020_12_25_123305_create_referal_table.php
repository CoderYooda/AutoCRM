<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('referal', function (Blueprint $table) {
            $table->bigIncrements(  'id');
            $table->bigInteger(     'user_id')->unsigned();
            $table->string(         'code')->unique();

            $table->boolean(        'percent_first_b')->default(false);
            $table->boolean(        'percent_each_b')->default(false);
            $table->boolean(        'rubbles_first_b')->default(false);
            $table->boolean(        'rubbles_each_b')->default(false);

            $table->integer(        'percent_first_value')->nullable();
            $table->integer(        'percent_each_value')->nullable();
            $table->integer(        'rubbles_first_value')->nullable();
            $table->integer(        'rubbles_each_value')->nullable();

            $table->text(           'comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('referal');
    }
}
