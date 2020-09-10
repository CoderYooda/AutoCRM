<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use App\Models\Role as LRole;
use Spatie\Permission\Models\Role;

class AddPermissionToCurrentUsers extends Migration
{
    private $roles = [
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
                'name' => 'Создавать заявки поставщикам через корзину',
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
                'model' => 'EntranceRefund',
                'type' => 'create'
            ]
        ];


    public function up()
    {
        $perms = Permission::whereIn('name', array_column($this->roles, 'name'))->pluck('id');
        $roles = Role::where('name', 'Руководитель')->get();
        foreach ($roles as $role){
            $role->givePermissionTo($perms);
        }
    }

    public function down()
    {
//        $users = User::all();
//
//        $perms = Permission::whereIn('name', array_column($this->roles, 'name'))->pluck('id');
//
//        foreach ($users as $user){
//            if($user->hasRole('Руководитель')){
//                $role = $user->roles()->first();
//                $role->revokePermissionTo($perms);
//            }
//        }
    }

}
