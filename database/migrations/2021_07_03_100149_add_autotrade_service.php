<?php

use \App\Models\Service;
use \App\Models\ServiceField;
use Illuminate\Database\Migrations\Migration;

class AddAutotradeService extends Migration
{
    protected $key = 'autotrade';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Service::query()->create([
            'category_id' => 0,
            'name' => 'АвтоТрейд',
            'url' => 'https://www.sklad.autotrade.su/',
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
