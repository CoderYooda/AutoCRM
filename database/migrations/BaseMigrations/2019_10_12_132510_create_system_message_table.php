<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSystemMessageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('system_message', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->default(1)->unsigned()->comment('Отправитель');
            $table->bigInteger('reciever_id')->unsigned()->comment('Получатель');
            $table->char('type')->comment('Тип оповещения');
            $table->char('kind')->nullable()->comment('Сущность');
            $table->bigInteger('kind_id')->nullable()->comment('ID Сущность');
            $table->char('link')->nullable()->comment('ссылка');
            $table->char('hash')->comment('Уникальный хэш');
            $table->boolean('viewed')->default(0)->comment('Прочитано?');
            $table->char('message')->comment('Системное сообщение');
            $table->char('channel')->nullable()->comment('Канал вещания');
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
        Schema::dropIfExists('system_message');
    }
}
