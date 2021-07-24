<?php

use \App\Models\Service;
use \App\Models\ServiceField;
use Illuminate\Database\Migrations\Migration;

class AddAutounionProvider extends Migration
{
    protected $key = 'autounion';

    public function up()
    {
        Service::query()->create([
            'category_id' => 0,
            'name' => 'АвтоСоюз-ЮГ',
            'url' => 'http://автосоюз-юг.рф',
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
