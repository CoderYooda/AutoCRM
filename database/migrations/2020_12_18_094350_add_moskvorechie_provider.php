<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoskvorechieProvider extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\Service::create([
            'name' => 'Москворечье',
            'url' => 'https://moskvorechie.ru/',
            'key' => 'mskrechie',
            'category_id' => 0
        ]);

        \App\Models\ServiceField::create([
            'name' => 'username',
            'placeholder' => 'Логин пользователя',
            'service_key' => 'mskrechie',
            'type' => 'text'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'api_key',
            'placeholder' => 'API-ключ',
            'service_key' => 'mskrechie',
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
        \App\Models\Service::where('key', 'mskrechie')->delete();
        \App\Models\ServiceField::where('service_key', 'mskrechie')->delete();
    }
}
