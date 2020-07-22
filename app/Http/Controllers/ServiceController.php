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
        return view(get_template() . '.system.settings_provider_dialog', compact('service'))
            ->with('company_id', Auth::user()->company_id);
    }

    public function save(Service $service, Company $company, SaveRequest $request)
    {

    }
}
