<?php

use App\Models\Role;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;

class InsertNewPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $permission = Permission::create(['name' => 'Смотреть статистику', 'model' => 'Statistic', 'type' => 'read']);

        $roles = Role::where('name', 'Руководитель')->get();

        foreach ($roles as $role) {
            $role->givePermissionTo($permission->id);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $permission = Permission::where('name', 'Смотреть статистику')->delete();

        $roles = Role::where('name', 'Руководитель')->get();

        foreach ($roles as $role) {
            $role->permissions()->detach($permission->id);
        }
    }
}
