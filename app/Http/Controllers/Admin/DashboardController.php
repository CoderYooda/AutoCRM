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

        $class = 'admindashboard';

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

    public function usersTab(Request $request)
    {
        $users = User::all();

        return view('admin.tabs.users', compact('request', 'users'));
    }

    public function tableData(Request $request)
    {
        if($request->active_tab == 'companies') {

            $companies = Company::when(strlen($request->search), function (Builder $q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('id', 'like', "%{$request->search}%");
            })
                ->paginate($request->size);

            foreach ($companies as $key => &$company) {
                $company->payed_days = Carbon::createFromTimestamp($company->payed_days)->format('d.m.Y');
                if (!strlen($company->name)) $company->name = "Новая компания";
            }

            return response()->json([
                'data' => $companies
            ]);
        }
        else if($request->active_tab == 'users') {

            $users = User::when(strlen($request->search), function (Builder $q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('id', 'like', "%{$request->search}%");
            })
                ->paginate($request->size);

            return response()->json([
                'data' => $users
            ]);
        }

        return response()->json('no content', 404);
    }
}
