<?php

use App\Models\Document;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewRoles extends Migration
{
    public function up()
    {
        $roles = [
            [
                'name' => 'Смотреть документы',
                'guard_name' => 'web',
                'model' => 'Document',
                'type' => 'read'
            ],
            [
                'name' => 'Создавать документы',
                'guard_name' => 'web',
                'model' => 'Document',
                'type' => 'create'
            ],

            [
                'name' => 'Смотреть склады поставщиков',
                'gurad_name' => 'web',
                'model' => 'ProviderStore',
                'type' => 'read'
            ],
            [
                'name' => 'Создавать заявки поставщикам',
                'gurad_name' => 'web',
                'model' => 'ProviderStore',
                'type' => 'create'
            ],

            [
                'name' => 'Смотреть возвраты поступлений',
                'gurad_name' => 'web',
                'model' => 'EntranceRefund',
                'type' => 'read'
            ],
            [
                'name' => 'Создавать возвраты поступлений',
                'gurad_name' => 'web',
                'model' => 'EntranceRefund's,
                'type' => 'create'
            ]
        ];

        DB::table('permissions')->insert($roles);
    }

    public function down()
    {
        DB::table('permissions')->where('model', 'Document')->delete();
        DB::table('permissions')->where('model', 'ProviderStore')->delete();
        DB::table('permissions')->where('model', 'EntranceRefund')->delete();
    }
}
