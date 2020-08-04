<?php

namespace App\Http\Controllers;

use App\Http\Requests\Services\SaveRequest;
use App\Models\Company;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function show(Service $service)
    {
        $provider_service = $service->getProviderService();

        /** @var Company $company */
        $company = Auth::user()->company;

        $view = view(get_template() . '.system.includes.settings_provider_dialog_inner', compact('service', 'provider_service', 'company'));

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function save(Service $service, SaveRequest $request)
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $company->serviceproviders()->detach($service->id);

        $company->serviceproviders()->attach($service->id, [
                'enabled' => !$request->enabled
            ]
        );

        $fields = DB::table('service_fields')
            ->where('service_key', $service->key)
            ->whereIn('name', array_keys($request->fields))
            ->get();

        foreach ($fields as $field) {

            $value = $request->fields[$field->name];

            DB::table('service_field_values')->updateOrInsert([
                'company_id' => $company->id,
                'service_key' => $service->key,
                'field_id' => $field->id
            ], ['value' => $value ]);
        }

        return response()->json([
            'message' => 'Настройка успешно сохранена.',
            'type' => 'success',
            'service' => $service
        ], 200);
    }
}
