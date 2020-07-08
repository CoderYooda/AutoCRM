<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HelpController as HC;
use App\Models\Category;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $target = HC::selectTarget();

        if($request->expectsJson() && $request['search'] == NULL){
            $content = view(env('DEFAULT_THEME', 'classic') . '.employee.index', compact('request'))->render();
            return response()->json([
                'target' => $target,
                'page' => 'Сотрудники',
                'html' => $content
            ]);
        } elseif($request->expectsJson() && $request['search'] != NULL)
        {
            $content = view(env('DEFAULT_THEME', 'classic') . '.employee.elements.list_container', compact('request'))->render();
            return response()->json([
                'html' => $content,
                'target' => 'ajax-table-employee',
            ], 200);
        } else {
            return view(env('DEFAULT_THEME', 'classic') . '.employee.index', compact('request'));
        }
    }

    public function tableData(Request $request)
    {
        $employees = EmployeeController::getEmployees($request);

        return response()->json($employees);
    }

    public static function getEmployees($request)
    {
        #TODO слить методы выборки сущностей (6.10)
        $category = 5;
        if($request['category_id']){
            $category = (int)$request['category_id'];
        }
        if($request['page']){
            Paginator::currentPageResolver(function () use ($request) {
                return (int)$request['page'];
            });
        }
        $employees = Partner::owned()->with('passport')->where(function($q) use ($request, $category){
            $q->where('category_id', $category);
            if($request['search'] != null) {
                if (mb_strlen($request['search']) === 1) {
                    $q->where('fio', 'LIKE', $request['search'] . '%' )
                        ->orWhere('companyName', 'LIKE', $request['search'] . '%');
                } else {
                    $q->where('fio', 'LIKE', '%' . $request['search'] . '%')
                        ->orWhere('companyName', 'LIKE', '%' . $request['search'] . '%')
                        ->orWhereHas('phones', function ($query) use ($request) {
                            $query->where('number', 'LIKE', '%' . $request['search'] . '%');
                        });
                }
                $q->orWhere('barcode', $request['search']);
            }
        })->orderBy('created_at', 'DESC')->paginate(11);

        return $employees;
    }

    public function resources(Request $request){
        $categories = Category::owned()->where('type', 'employee')->get();
        $employees = Partner::owned()
            ->where(function($q) use ($request, $categories){
                $q->whereIn('category_id', $categories->pluck('id'));
            })->get();
        $resources = [];
        foreach($employees as $employee){
            $resources[] = [
                'id' => $employee->id,
                'title' => $employee->outputName()
            ];
        }
        return response($resources);
    }
}
