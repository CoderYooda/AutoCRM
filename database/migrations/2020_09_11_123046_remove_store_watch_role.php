<?php

use App\Models\Role;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;

class RemoveStoreWatchRole extends Migration
{
    public function up()
    {
        $permission = Permission::where('name', 'Смотреть товары')->first();

        $roles = Role::all();
        foreach ($roles as $role) {
            $role->revokePermissionTo($permission->id);
        }

        $permission->delete();
    }

    public function down()
    {
        $permission = Permission::create([
            'name'       => 'Смотреть товары',
            'gurad_name' => 'web',
            'model'      => 'Article',
            'type'       => 'create'
        ]);

        $roles = Role::all();
        foreach ($roles as $role) {
            $role->givePermissionTo($permission->id);
        }
    }
}
