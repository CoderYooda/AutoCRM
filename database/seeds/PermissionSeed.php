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

        Permission::create(['name' => 'Управлять системой',         'model' => 'App',      'type' => 'hidden']);

        Permission::create(['name' => 'Смотреть категории',         'model' => 'Category',      'type' => 'read']);
        Permission::create(['name' => 'Создавать категории',        'model' => 'Category',      'type' => 'create']);
        Permission::create(['name' => 'Удалять категории',          'model' => 'Category',      'type' => 'delete']);
        Permission::create(['name' => 'Редактировать категории',    'model' => 'Category',      'type' => 'edit']);

        Permission::create(['name' => 'Создавать товары',           'model' => 'Article',       'type' => 'create']);
        Permission::create(['name' => 'Удалять товары',             'model' => 'Article',       'type' => 'delete']);
        Permission::create(['name' => 'Редактировать товары',       'model' => 'Article',       'type' => 'edit']);

        Permission::create(['name' => 'Смотреть заявки поставщикам',            'model' => 'ProviderOrder',       'type' => 'read']);
        Permission::create(['name' => 'Создавать заявки поставщикам',           'model' => 'ProviderOrder',       'type' => 'create']);
        Permission::create(['name' => 'Удалять заявки поставщикам',             'model' => 'ProviderOrder',       'type' => 'delete']);
        Permission::create(['name' => 'Редактировать заявки поставщикам',       'model' => 'ProviderOrder',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть поступления',            'model' => 'Entrance',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать поступления',           'model' => 'Entrance',       'type' => 'create']);
	    Permission::create(['name' => 'Удалять поступления',             'model' => 'Entrance',       'type' => 'delete']);
	    Permission::create(['name' => 'Редактировать поступления',       'model' => 'Entrance',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть продажи',            'model' => 'Shipments',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать продажи',           'model' => 'Shipments',       'type' => 'create']);
	    Permission::create(['name' => 'Удалять продажи',             'model' => 'Shipments',       'type' => 'delete']);
	    Permission::create(['name' => 'Редактировать продажи',       'model' => 'Shipments',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть заказ клиента',            'model' => 'ClientOrder',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать заказ клиента',           'model' => 'ClientOrder',       'type' => 'create']);
	    Permission::create(['name' => 'Удалять заказ клиента',             'model' => 'ClientOrder',       'type' => 'delete']);
	    Permission::create(['name' => 'Редактировать заказ клиента',       'model' => 'ClientOrder',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть корректировки',            'model' => 'Adjustment',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать корректировки',           'model' => 'Adjustment',       'type' => 'create']);
//	    Permission::create(['name' => 'Удалять корректировки',             'model' => 'Adjustment',       'type' => 'delete']);
//	    Permission::create(['name' => 'Редактировать корректировки',       'model' => 'Adjustment',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть денежные операции',            'model' => 'Warrant',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать денежные операции',           'model' => 'Warrant',       'type' => 'create']);
	    Permission::create(['name' => 'Удалять денежные операции',             'model' => 'Warrant',       'type' => 'delete']);
	    Permission::create(['name' => 'Редактировать денежные операции',       'model' => 'Warrant',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть денежные перемещения',            'model' => 'Cashmove',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать денежные перемещения',           'model' => 'Cashmove',       'type' => 'create']);
	    Permission::create(['name' => 'Удалять денежные перемещения',             'model' => 'Cashmove',       'type' => 'delete']);
	    Permission::create(['name' => 'Редактировать денежные перемещения',       'model' => 'Cashmove',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть контакты',                          'model' => 'Partner',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать контакты',                         'model' => 'Partner',       'type' => 'create']);
	    Permission::create(['name' => 'Удалять контакты',                           'model' => 'Partner',       'type' => 'delete']);
	    Permission::create(['name' => 'Редактировать контакты',                     'model' => 'Partner',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть возвраты',                          'model' => 'Refund',       'type' => 'read']);
	    Permission::create(['name' => 'Создавать возвраты',                         'model' => 'Refund',       'type' => 'create']);
	    Permission::create(['name' => 'Удалять возвраты',                           'model' => 'Refund',       'type' => 'delete']);
	    Permission::create(['name' => 'Редактировать возвраты',                     'model' => 'Refund',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть планировщик',                         'model' => 'Schedule',       'type' => 'read']);
	    Permission::create(['name' => 'Редактировать планировщик',                    'model' => 'Schedule',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть настройки',                         'model' => 'Settings',       'type' => 'read']);
	    Permission::create(['name' => 'Редактировать настройки',                    'model' => 'Settings',       'type' => 'edit']);

	    Permission::create(['name' => 'Смотреть историю',                           'model' => 'History',       'type' => 'read']);

	    Permission::create(['name' => 'Смотреть баланс',                           'model' => 'Payment',       'type' => 'read']);

	    $superAdmin = Role::create(['name' => 'Суперадмин', 'company_id' => 1]);
        $superAdmin->givePermissionTo('Смотреть настройки');
        $user = User::whereId(1)->first();
        $user->assignRole($superAdmin);


//	    $permissions = Permission::all()->pluck('id');
//	    $role1 = Role::create(['name' => 'Руководитель', 'company_id' => 2]);
//        $role1->givePermissionTo($permissions);
//
//        $role2 = Role::create(['name' => 'Менеджер', 'company_id' => 2]);
//
//        $user = User::whereId(2)->first();
//        $user->assignRole($role1);
    }
}

