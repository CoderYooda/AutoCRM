<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSMSMessageClientOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_m_s_message_client_order', function (Blueprint $table) {
            $table->bigInteger('client_order_id')->unsigned()->comment('Привязка к заказу клиента');
            $table->bigInteger('s_m_s_message_id')->unsigned()->comment('Привязка к сообщению');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('s_m_s_message_client_order');
    }
}
