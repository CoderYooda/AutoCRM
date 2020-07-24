<?php

namespace App\Http\Controllers\API;

use App\Services\ProviderService\Providers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProviderStoreController extends Controller
{
    public function tableData(Request $request, Providers $providers)
    {
        foreach ($providers->all() as $provider) {

            if(!$provider->isActivated()) continue;

            dd($provider);
        }
    }
}
