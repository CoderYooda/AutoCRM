<?php

namespace App\Http\Controllers;

use App\Http\Requests\Services\SaveRequest;
use App\Http\Requests\Services\ToggleRequest;
use App\Http\Requests\Services\UpdateSortRequest;
use App\Models\Company;
use App\Models\Service;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    /** @var Company */
    protected $company = null;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->company = Auth::user()->company;
            return $next($request);
        });
    }

    public function show(Service $service)
    {
        $provider_service = $service->getProviderService();

        $view = view(get_template() . '.system.includes.settings_provider_dialog_inner', compact('service', 'provider_service'))
            ->with('company', $this->company);

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function toggle(Service $service, ToggleRequest $request)
    {
        $enabled = (int)!$request->enabled;

        if(!$this->company->serviceproviders()->where('service_id', $service->id)->exists()) {
            throw new HttpResponseException(
                response()->json(['message' => 'Для активации сервиса его нужно сохранить.', 'type' => 'error'], 422)
            );
        }

        $this->company->serviceproviders()->updateExistingPivot($service->id, [
            'enabled' => $enabled
        ]);

        return response()->json([
            'enabled' => $enabled,
            'type' => 'success',
            'message' => 'Сервис активен'
        ]);
    }

    public function save(Service $service, SaveRequest $request)
    {
        $this->company->serviceproviders()->sync([
            $service->id  => [
                'enabled' => $request->enabled
            ]
        ], false);

        $fields = DB::table('service_fields')
            ->where('service_key', $service->key)
            ->whereIn('name', array_keys($request->fields))
            ->get();

        foreach ($fields as $field) {

            $value = $request->fields[$field->name];

            DB::table('service_field_values')->updateOrInsert([
                'company_id' => $this->company->id,
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

    public function updateSort(UpdateSortRequest $request)
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        foreach ($request->sorts as $sort)
        {
            $company->serviceproviders()->updateExistingPivot($sort['id'], [
                 'sort' => $sort['sort']
            ]);
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Сортировка успешно сохранена.'
        ]);
    }
}
