<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\Models\User;

class PermissionSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'Создавать категории',        'model' => 'Category',      'type' => 'create']);
        Permission::create(['name' => 'Удалять категории',          'model' => 'Category',      'type' => 'delete']);
        Permission::create(['name' => 'Редактировать категории',    'model' => 'Category',      'type' => 'edit']);

        Permission::create(['name' => 'Создавать товары',           'model' => 'Article',      'type' => 'create']);
        Permission::create(['name' => 'Удалять товары',             'model' => 'Article',      'type' => 'delete']);
        Permission::create(['name' => 'Редактировать товары',       'model' => 'Article',      'type' => 'edit']);


        $role1 = Role::create(['name' => 'Руководитель', 'company_id' => 2]);
        $role1->givePermissionTo('Создавать категории');
        $role1->givePermissionTo('Удалять категории');

        $role2 = Role::create(['name' => 'Менеджер', 'company_id' => 2]);
        $role2->givePermissionTo('Создавать категории');

        $user = User::whereId(2)->first();
        $user->assignRole($role1);
        $user->assignRole($role1);
    }
}

