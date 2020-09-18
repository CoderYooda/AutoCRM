<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditServiceFieldsTable extends Migration
{
    public function up()
    {
        Schema::table('service_fields', function (Blueprint $table) {
            $table->dropColumn('service_id');
            $table->string('service_key');
            $table->string('type');
        });

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

    public function down()
    {
        Schema::table('service_fields', function (Blueprint $table) {
            $table->string('service_id');
            $table->dropColumn('service_key');
            $table->dropColumn('type');
        });

        \Illuminate\Support\Facades\DB::table('service_fields')->delete();
    }
}
