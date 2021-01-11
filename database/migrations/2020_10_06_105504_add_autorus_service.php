<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAutorusService extends Migration
{
    private $key = 'autorus';

    public function up()
    {
        \App\Models\Service::create([
            'category_id' => 0,
            'name' => 'AutoRus',
            'url' => 'https://b2b.autorus.ru/',
            'key' => $this->key
        ]);

        \App\Models\ServiceField::create([
            'name' => 'login',
            'service_key' => $this->key,
            'placeholder' => 'Логин',
            'type' => 'text'
        ]);

        \App\Models\ServiceField::create([
            'name' => 'password',
            'service_key' => $this->key,
            'placeholder' => 'Пароль',
            'type' => 'text'
        ]);
    }

    public function down()
    {
        \App\Models\Service::where('key', $this->key)->delete();
        \App\Models\ServiceField::where('service_key', $this->key)->delete();
    }
}
