<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\Company;
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
        return Role::where('company_id', Auth::user()->company->id)->get();
    }

    public function store(RoleRequest $request)
    {
        $ids = [];

        if (isset($request['perms'])) {
            foreach ($request['perms'] as $id => $perm) {
                $ids[] = $id;
            }
        }

        $role = Role::updateOrCreate([
            'id'         => $request->id,
            'company_id' => Auth::user()->company->id
        ], ['name' => $request->name]);

        $role->syncPermissions($ids);

        return response()->json([
            'message' => $role->exists ? 'Роль обновлена' : 'Роль создана',
            'event'   => 'RoleStored',
        ], 200);
    }

    public function assignRoleToUser(Request $request)
    {
        $user = User::find($request->user_id);
        $role = Role::find($request->role_id);

        $user->syncRoles([$role->id]);

        return response()->json([
            'message' => 'Роль назначена пользователю',
            'event'   => 'RoleAssigned',
        ], 200);
    }

    public static function roleDialog($request)
    {
        $role = Role::find($request->role_id);
        $tag = 'roleDialog' . ($role->id ?? '');

        $permissions = PermissionController::getPermissionArray($role);

        return response()->json([
            'tag'  => $tag,
            'html' => view(get_template() . '.role.dialog.form_role', compact('request', 'role', 'permissions'))->render()
        ]);
    }

    public function delete($id)
    {
        PermissionController::canByPregMatch('Редактировать настройки');

        $role = LRole::owned()->where('id', $id)->first();
        $this->message = 'Роль удалена';
        $returnIds = $role->id;

        if ($role->company->id != Auth::user()->company_id) {
            $this->message = 'Вам не разрешено удалять контакт';
            $this->status = 422;
        }

        $role->delete();
        UA::makeUserAction($role, 'delete');

        $this->status = 200;

        return response()->json([
            'id'      => $returnIds,
            'message' => $this->message
        ], $this->status);
    }

    public static function createStartRoles(Company $company)
    {
        $director_role = LRole::create(['name' => 'Руководитель', 'company_id' => $company->id]);
        $manager_role = LRole::create(['name' => 'Менеджер', 'company_id' => $company->id]);

        $manager_roles = [
            'Смотреть категории',
            'Создавать категории',
            'Создавать товары',
            'Смотреть поступления',
            'Создавать поступления',
            'Смотреть продажи',
            'Создавать продажи',
            'Смотреть заказ клиента',
            'Создавать заказ клиента',
            'Смотреть корректировки',
            'Создавать денежные операции',
            'Смотреть контакты',
            'Создавать контакты',
            'Редактировать контакты',
            'Смотреть возвраты',
            'Создавать возвраты',
            'Смотреть планировщик',
            'Смотреть историю',
            'Смотреть документы',
            'Создавать документы',
            'Смотреть склады поставщиков',
            'Создавать заявки поставщикам через корзину',
            'Смотреть возвраты поступлений',
            'Создавать возвраты поступлений'
        ];

        $roleIds = Permission::whereIn('name', $manager_roles)->pluck('id');

        $manager_role->givePermissionTo($roleIds);
        $roles['main'] = $director_role;
        $roles['default'] = $manager_role;
        $permissions = Permission::all()->pluck('id');
        $director_role->givePermissionTo($permissions);

        return $roles;
    }
}
