<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAutopiterProvider extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Автопитер',
            'url' => 'https://autopiter.ru/',
            'key' => 'autopiter',
            'category_id' => 0
        ]);

        \App\Models\ServiceField::create([
            'name' => 'user_id',
            'placeholder' => 'ID Пользователя',
            'service_key' => 'autopiter',
            'type' => 'text'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'password',
            'placeholder' => 'Пароль',
            'service_key' => 'autopiter',
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
        \App\Models\Service::where('key', 'autopiter')->delete();
        \App\Models\ServiceField::where('service_key', 'autopiter')->delete();
    }
}
