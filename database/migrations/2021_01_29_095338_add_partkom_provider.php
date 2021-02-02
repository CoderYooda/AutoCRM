<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPartkomProvider extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Партком',
            'url' => 'http://www.part-kom.ru/',
            'key' => 'partkom',
            'category_id' => 0
        ]);

        \App\Models\ServiceField::create([
            'name' => 'login',
            'placeholder' => 'Логин',
            'service_key' => 'partkom',
            'type' => 'text'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'password',
            'placeholder' => 'Пароль',
            'service_key' => 'partkom',
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
        \App\Models\Service::where('key', 'partkom')->delete();
        \App\Models\ServiceField::where('service_key', 'partkom')->delete();
    }
}
