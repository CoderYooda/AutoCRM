<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProviderForumauto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Форум-Авто',
            'url' => 'https://forum-auto.ru/',
            'key' => 'forumauto'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'login',
            'placeholder' => 'Логин',
            'service_key' => 'forumauto',
            'type' => 'text'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'password',
            'placeholder' => 'Пароль',
            'service_key' => 'forumauto',
            'type' => 'text'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \App\Models\Service::where('key', 'formauto')->delete();
        \App\Models\ServiceField::where('service_key', 'formauto')->delete();
    }
}
