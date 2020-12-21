<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSMSMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_m_s_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->string('phone')->nullable();
            $table->integer('code')->nullable()->comment('Код смс');
            $table->integer('status_code')->nullable()->comment('Код статуса');
            $table->char('sms_id')->nullable()->comment('Идентификатор');
            $table->double('cost')->nullable()->comment('Стоимость СМС');
            $table->ipAddress('ip')->nullable()->comment('Адресс отправителя');
            $table->text('message')->nullable();
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
        Schema::dropIfExists('s_m_s_messages');
    }
}
