<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProviderMikado extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $service = \App\Models\Service::create([
            'category_id' => 0,
            'name' => 'Микадо',
            'img' => '',
            'url' => 'https://mikado-parts.ru/',
            'key' => 'mikado'
        ]);

        \Illuminate\Support\Facades\DB::table('service_fields')->insert([
            'name' => 'login',
            'placeholder' => 'Логин',
            'service_key' => 'mikado',
            'type' => 'text'
        ]);

        \Illuminate\Support\Facades\DB::table('service_fields')->insert([
            'name' => 'password',
            'placeholder' => 'Пароль',
            'service_key' => 'mikado',
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
        //
    }
}
