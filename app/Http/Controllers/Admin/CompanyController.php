<?php

namespace App\Http\Controllers\Admin;

use App\DocumentType;
use App\Http\Controllers\PermissionController;
use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
{
    public static function companyDialog(Request $request)
    {
        $company = Company::find($request->company_id);

        $class = 'companyDialog' . ($company->id ?? '');

        $view = view('admin.dialogs.form_company', compact('request', 'class', 'company'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render(),
            'company' => $company
        ]);
    }

    public function tableData(Request $request)
    {
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
}
