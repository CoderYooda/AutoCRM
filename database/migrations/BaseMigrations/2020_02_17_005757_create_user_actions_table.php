<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_actions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->default(1)->unsigned()->comment('Инициатор');
            $table->bigInteger('company_id')->unsigned()->comment('Компания');
            $table->char('model')->comment('Модель');
            $table->char('type')->comment('Тип');
            $table->bigInteger('model_id')->comment('Модель ID');
            $table->char('message')->comment('Cообщение');
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
        Schema::dropIfExists('user_actions');
    }
}
