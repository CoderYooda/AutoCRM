<?php

use App\Models\Document;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;

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
                'guard_name' => 'web',
                'model' => 'ProviderStore',
                'type' => 'read'
            ],
            [
                'name' => 'Создавать заявки поставщикам через корзину',
                'guard_name' => 'web',
                'model' => 'ProviderStore',
                'type' => 'create'
            ],

            [
                'name' => 'Смотреть возвраты поступлений',
                'guard_name' => 'web',
                'model' => 'EntranceRefund',
                'type' => 'read'
            ],
            [
                'name' => 'Создавать возвраты поступлений',
                'guard_name' => 'web',
                'model' => 'EntranceRefund',
                'type' => 'create'
            ]
        ];

        Permission::whereIn('name', array_column($roles, 'name'))->delete();

        foreach($roles as $role){
            Permission::create($role);
        }


    }

    public function down()
    {
        DB::table('permissions')->where('model', 'Document')->delete();
        DB::table('permissions')->where('model', 'ProviderStore')->delete();
        DB::table('permissions')->where('model', 'EntranceRefund')->delete();
    }
}
