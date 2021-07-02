<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use \App\Models\Service;
use \App\Models\ServiceField;

class AddMotexcService extends Migration
{
    protected $key = 'motexc';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Service::query()->create([
            'category_id' => 0,
            'name' => 'Мотекс',
            'url' => 'https://motexc.ru/',
            'key' => $this->key,
        ]);

        ServiceField::query()->create([
            'name' => 'login',
            'placeholder' => 'Логин',
            'service_key' => $this->key,
            'type' => 'text',
        ]);

        ServiceField::query()->create([
            'name' => 'password',
            'placeholder' => 'Пароль',
            'service_key' => $this->key,
            'type' => 'text',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Service::query()->where('key', $this->key)->delete();
        ServiceField::query()->where('service_key', $this->key)->delete();
    }
}
