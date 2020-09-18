<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveUnvalidServiceProviders extends Migration
{
    public function up()
    {
        \App\Models\Service::where('id', '>', '2')->delete();

        $service = \App\Models\Service::create([
            'category_id' => 0,
            'name' => 'ArmTek',
            'img' => 'armtek.jpg',
            'url' => 'https://armtek.ru/'
        ]);

        \App\Models\ServiceField::create([
            'service_id' => $service->id,
            'name' => 'login',
            'placeholder' => 'Логин'
        ]);

        \App\Models\ServiceField::create([
            'service_id' => $service->id,
            'name' => 'password',
            'placeholder' => 'Пароль'
        ]);

        \App\Models\ServiceField::create([
            'service_id' => $service->id,
            'name' => 'sales_organization',
            'placeholder' => 'Сбытовая организация'
        ]);
    }

    public function down()
    {
        \App\Models\Service::where('id', '>', '2')->delete();
    }
}
