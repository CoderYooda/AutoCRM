<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSmsConfirmationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_confirmation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('phone')->comment('Номер телефона');
            $table->char('status')->nullable()->comment('Статус текст');
            $table->integer('code')->nullable()->comment('Код смс');
            $table->integer('status_code')->nullable()->comment('Код статуса');
            $table->char('sms_id')->nullable()->comment('Идентификатор');
            $table->double('cost')->nullable()->comment('Стоимость СМС');
            $table->ipAddress('ip')->nullable()->comment('Адресс отправителя');
            $table->integer('attempts')->default(0)->comment('Адресс отправителя');
            $table->boolean('isblocked')->default(0)->comment('Заблокирован');
            $table->boolean('confirmed')->default(0)->comment('Заблокирован');
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
        Schema::dropIfExists('sms_confirmation');
    }
}
