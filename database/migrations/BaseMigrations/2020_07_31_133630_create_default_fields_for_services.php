<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDefaultFieldsForServices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $services = [
            1 => [
                'api_key' => 'API ключ'
            ],
            2 => [
                'login' => 'Логин',
                'password' => 'Пароль'
            ]
        ];

        foreach ($services as $service_id => $fields) {

            foreach ($fields as $name => $placeholder) {

                DB::table('service_fields')->insert([
                    'service_id' => $service_id,
                    'name' => $name,
                    'placeholder' => $placeholder
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('service_fields')->delete();
    }
}
