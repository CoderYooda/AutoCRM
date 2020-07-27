<?php

namespace App\Http\Controllers\API;

use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProviderStoreController extends Controller
{
    public function tableData(Request $request, Providers $providers)
    {
        $counts = [];

        $manufacturers = [];

        foreach ($providers->all() as $provider) {

            if(!$provider->isActivated()) continue;

            $service_id = $provider->getServiceId();

            $counts[$service_id] = $provider->searchBrandsCount($request->search);

            if($service_id == $request->selected_service) {
                $manufacturers = $counts[$service_id];
            }
        }

        $view = view(get_template() . '.provider_stores.includes.products_element', compact('manufacturers', 'request'));

        return response()->json([
            'counts' => $counts,
            'html' => $view->render()
        ]);
    }

    public function getStores(Providers $providers, Request $request)
    {
        $selected_service = $request->selected_service;
        $article = $request->article;
        $manufacturer = $request->manufacturer;

        /** @var ProviderInterface $provider */
        $provider = $providers->find($selected_service);

        $stores = $provider->getStoresByArticleAndBrand($article, $manufacturer);

        $view = view(get_template() . '.provider_stores.includes.table_element', compact('stores'));

        return response()->json([
            'html' => $view->render()
        ]);
    }
}
