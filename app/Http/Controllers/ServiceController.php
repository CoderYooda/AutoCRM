<?php

namespace App\Http\Controllers;

use App\Http\Requests\Services\SaveRequest;
use App\Models\Company;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function show(Service $service)
    {
        $view = view(get_template() . '.system.includes.settings_provider_dialog_inner', compact('service'))
            ->with('company', Auth::user()->company);

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function save(Service $service, SaveRequest $request)
    {
        $company = Company::find($request->company_id);

        $company->serviceproviders()->detach($service->id);

        $company->serviceproviders()->attach($service->id, [
                'key' => $request->key,
                'enabled' => !$request->enabled
            ]
        );

        return response()->json([
            'message' => 'Настройка успешно сохранена.',
            'type' => 'success',
            'service' => $service
        ], 200);
    }
}
