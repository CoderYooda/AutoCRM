<?php

namespace App\Http\Controllers\Admin;

use App\Models\Company;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HelpController as HC;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // точка входа в страницу
        $page_title = 'Панель управления';

        $class = 'admin';

        // цель динамической подгрузки
        $target = HC::selectTarget();

        // Определяем табуляцию
        if ($request['active_tab'] === NULL || $request['active_tab'] == 'undefined') {
            $request['active_tab'] = 'companies';
        }

        $classname = $request['active_tab'] . 'Tab';

        $content = self::$classname($request);
        $content->with('class', $class);

        if (class_basename($content) == "JsonResponse") {
            return $content;
        }

        if ($request['view_as'] != null && $request['view_as'] == 'json') {

            return response()->json([
                'target' => $target,
                'page' => $page_title,
                'html' => $content->render(),
                'class' => $class
            ]);
        }

        return $content;
    }

    public function companiesTab(Request $request)
    {
        $companies = Company::all();

        return view('admin.tabs.companies', compact('request', 'companies'));
    }
    public function partnersTab(Request $request)
    {
        $partners = User::whereHas(
            'roles', function($q){
            $q->where('name', 'Реферальный партнёр');
        })->with('referal', 'referal.companies')->orderBy('id', 'DESC')->paginate(10);
//        $superAdmin = Role::create(['name' => 'Суперадмин', 'company_id' => 1]);
//        $superAdmin->givePermissionTo('Смотреть настройки');
//        $user = User::whereId(1)->first();
//        $user->assignRole($superAdmin);

        return view('admin.tabs.partners', compact('request', 'partners'));
    }

    public function usersTab(Request $request)
    {
        $users = User::all();

        return view('admin.tabs.users', compact('request', 'users'));
    }

    public function tableData(Request $request)
    {
        $methods = [
            'companies' => CompanyController::class,
            'users' => UserController::class
        ];

        if(!in_array($request->active_tab, array_keys($methods))) {
            return response()->json('no content', 404);
        }

        return $methods[$request->active_tab]::tableData($request);
    }
}
