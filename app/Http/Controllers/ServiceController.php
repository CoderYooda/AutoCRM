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
            ->with('company_id', Auth::user()->company_id);

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function save(Service $service, Company $company, SaveRequest $request)
    {
        dd($service, $company);
    }
}
