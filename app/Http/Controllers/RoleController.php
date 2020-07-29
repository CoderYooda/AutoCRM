<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserActionsController as UA;
use App\Models\Role as LRole;

class RoleController extends Controller
{
	public static function getRoles($request)
	{
		$roles = Role::where('company_id', Auth::user()->company->id)->get();

		return $roles;
	}

	public function store(RoleRequest $request)
	{
		$ids = [];
		if(isset($request['perms'] )){
			foreach($request['perms'] as $id => $perm){
				$ids[] = $id;
			}
		}

		$role = Role::firstOrNew(['id' => $request['id']]);
		$this->status = 200;
		if($role->exists){
			$this->message = 'Роль обновлена';
		} else {
			$this->message = 'Роль создана';
		}
		$role->company_id = Auth::user()->company->id;
		$role->name = $request['name'];
		$role->save();
		$role->syncPermissions($ids);

		if($request->expectsJson()){
			return response()->json([
				'message' => $this->message,
				'event' => 'RoleStored',
			], $this->status);
		} else {
			return redirect()->back();
		}
	}

	public function assignRoleToUser(Request $request)
	{
		$user = User::owned()->where('id', $request['user_id'])->first();
		$role = Role::where('company_id', Auth::user()->company()->first()->id)->where('id', $request['role_id'])->first();

		$user->syncRoles([$role->id]);

		if($request->expectsJson()){
			return response()->json([
				'message' => 'Роль назначена пользователю',
				'event' => 'RoleAssigned',
			], 200);
		} else {
			return redirect()->back();
		}
	}

	public static function roleDialog($request)
	{
		$tag = 'roleDialog';
		if ($request['role_id']) {
			$tag .= $request['role_id'];
			$role = Role::where('id', (int)$request['role_id'])->first();
		} else {
			$role = NULL;
		}

		$permissions = PermissionController::getPermissionArray($role);

		return response()->json([
			'tag' => $tag,
			'html' => view(get_template() . '.role.dialog.form_role', compact('request', 'role', 'permissions'))->render()
		]);
	}

    public function delete($id)
    {
        PermissionController::canByPregMatch('Редактировать настройки');

        $role = LRole::owned()->where('id', $id)->first();
        $this->message = 'Роль удалена';
        $returnIds = $role->id;
        if($role->company()->first()->id != Auth::user()->company()->first()->id){
            $this->message = 'Вам не разрешено удалять контакт';
            $this->status = 422;
        }
        $role->delete();
        UA::makeUserAction($role, 'delete');

        $this->status = 200;


        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], $this->status);
    }

	public static function createStartRoles($company)
	{
		$role = LRole::create(['name' => 'Руководитель', 'company_id' => $company->id]);
		$role2 = LRole::create(['name' => 'Менеджер', 'company_id' => $company->id]);
        $role2->givePermissionTo(Permission::whereIn('id' , [2,3, 6,7,14,15,18,19,22,23,26,29,36,37,39,40,41,44,48])->get());
        $roles['main'] = $role;
        $roles['default'] = $role2;
		$permissions = Permission::all()->pluck('id');
		$role->givePermissionTo($permissions);

		return $roles;
	}
}
