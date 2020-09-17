<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixServiceFieldMigrate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Illuminate\Support\Facades\DB::table('service_fields')->delete();

        $services = [
            'trinity' => [
                'apy_key' => [
                    'placeholder' => 'API ключ',
                    'type' => 'text'
                ]
            ],
            'avtoimport' => [
                'login' => [
                    'placeholder' => 'Логин',
                    'type' => 'text'
                ],
                'password' => [
                    'placeholder' => 'Пароль',
                    'type' => 'text'
                ]
            ],
            'armtek' => [
                'login' => [
                    'placeholder' => 'Логин',
                    'type' => 'text'
                ],
                'password' => [
                    'placeholder' => 'Пароль',
                    'type' => 'text'
                ],
                'sales_organization' => [
                    'placeholder' => 'Сбытовая организация',
                    'type' => 'select'
                ]
            ]
        ];

        foreach ($services as $service_key => $fields) {

            foreach ($fields as $field_name => $params) {
                \Illuminate\Support\Facades\DB::table('service_fields')->insert([
                    'service_key' => $service_key,
                    'name' => $field_name,
                    'type' => $params['type'],
                    'placeholder' => $params['placeholder']
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
        //
    }
}
