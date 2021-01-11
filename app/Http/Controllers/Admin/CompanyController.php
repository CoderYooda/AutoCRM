<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\PermissionController;
use App\Http\Requests\Admin\Companies\UpdateRequest;
use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
{
    public static function dialog(Request $request)
    {
        $company = Company::find($request->company_id);

        $class = 'companyDialog' . ($company->id ?? '');

        $view = view('admin.dialogs.form_company', compact('request', 'class', 'company'));

        return response()->json([
            'tag'     => $class,
            'html'    => $view->render(),
            'company' => $company
        ]);
    }

    public static function selectDialog(Request $request)
    {
        $companies = Company::when(strlen($request->search), function (Builder $query) use ($request) {
            $query->where('id', 'like', "%{$request->search}%")
                ->orWhere('name', 'like', "%{$request->search}%");
        })
            ->paginate(15);

        $class = 'selectCompanyDialog';

        $viewName = $request->has('inner') ? 'admin.dialogs.includes.form_company_select_inner' :  'admin.dialogs.form_company_select';

        $view = view($viewName, compact('request', 'class', 'companies'));

        return response()->json([
            'tag'       => $class,
            'html'      => $view->render(),
            'companies' => $companies
        ]);
    }

    public static function tableData(Request $request)
    {
        $field = $request['sorters'][0]['field'] ?? 'created_at';
        $dir = $request['sorters'][0]['dir'] ?? 'DESC';

        $companies = Company::when(strlen($request->search), function (Builder $q) use ($request) {
            $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('id', 'like', "%{$request->search}%");
        })
            ->orderBy($field, $dir)
            ->paginate($request->size);

        foreach ($companies as $key => &$company) {
            $company->payed_days = Carbon::createFromTimestamp($company->payed_days)->format('d.m.Y');
            if (!strlen($company->name)) $company->name = "Новая компания";
        }

        return response()->json([
            'data' => $companies
        ]);
    }

    public function update(UpdateRequest $request, Company $company)
    {
        $last_day = Carbon::createFromTimestamp($company->payed_days)->hour(0)->minute(0)->second(0)->timestamp;
        $diff_time = $company->payed_days - $last_day;

        $request->payed_days = (Carbon::now()->hour(0)->minute(0)->second(0)->timestamp + (86400 * $request->payed_days)) + $diff_time;

        $company->update([
            'payed_days' => $request->payed_days,
            'blocked'    => $request->blocked
        ]);

        return response()->json([
            'type'    => 'success',
            'message' => 'Компанию успешно сохранена.'
        ]);
    }
}
