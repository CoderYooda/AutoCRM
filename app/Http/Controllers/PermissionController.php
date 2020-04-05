<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
	public static function getPermissionArray($role){
		$permissions = Permission::all();
		
		$names = [
			'Category' => 'Категории',
			'Article' => 'Товары',
			'ProviderOrder' => 'Заявки поставщику',
			'Entrance' => 'Поступления',
			'Shipments' => 'Продажи',
			'ClientOrder' => 'Заказы клиентов',
			'Adjustment' => 'Корректировки',
			'Warrant' => 'Денежные операции',
			'Cashmove' => 'Денежные перемещения',
			'Partner' => 'Контакты',
			'Schedule' => 'Планировщик',
			'Settings' => 'Настройки',
			'History' => 'История',
		];
		if(isset($role) && $role != null){
			$role_permissions = $role->permissions;
		}
		$perms_array = [];
		foreach($permissions as $permission){
			$perms_array[$permission->model]['name'] = $names[$permission->model];
			$perms_array[$permission->model]['types'][$permission->type]['id'] = $permission->id;
			$perms_array[$permission->model]['types'][$permission->type]['checked'] = false;
			if(isset($role_permissions)){
				foreach($role_permissions as $perm){
					if($permission->id === $perm->id){
						$perms_array[$permission->model]['types'][$permission->type]['checked'] = true;
					}
				}
			}
		}
		//dd($perms_array);
		return $perms_array;
	}
	
	public static function closedResponse($message){
		return response()->json([
			'type' => 'gateClosed',
			'message' => $message
		], 403);
	}
}
