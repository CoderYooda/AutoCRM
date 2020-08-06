<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\ProviderStore\SearchRequest;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProviderStoreController extends Controller
{
    public function tableData(Request $request, Providers $providers)
    {
        $request->search = preg_replace('/[^a-z\d]/', '', $request->search);

        $counts = [];
        $manufacturers = [];
        $errors = [];

        foreach ($providers->activated() as $provider) {

            $service_key = $provider->getServiceKey();

            try {
                $counts[$service_key] = $request->search ? $provider->searchBrandsCount((string)$request->search) : [];
            }
            catch (\Exception $exception) {

                $counts[$service_key] = [];

                $errors[$service_key] = 'Ошибка получения ответа, проверьте соединение интернета и настройки.';
            }

            if ($service_key == $request->selected_service) {
                $manufacturers = $counts[$service_key];
            }
        }

        $view = view(get_template() . '.provider_stores.includes.products_element', compact('manufacturers', 'request'));

        return response()->json([
            'counts' => $counts,
            'html' => $view->render(),
            'errors' => $errors
        ]);
    }

    public function getStores(Providers $providers, Request $request)
    {
        $selected_service = $request->selected_service;
        $article = $request->article;
        $manufacturer = $request->manufacturer;

        /** @var ProviderInterface $provider */
        $provider = $providers->find((string)$selected_service);

        $stores = $provider->getStoresByArticleAndBrand($article, $manufacturer);

        $stores = collect($stores)->sortBy('price')->toArray();

        $view = view(get_template() . '.provider_stores.includes.table_element', compact('stores'));

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function getArmTekSerialSales(Request $request)
    {
        $url = "http://ws.armtek.ru/api/ws_user/getUserVkorgList?format=json";

        $result = file_get_contents($url, null, stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => 'Content-Type: application/json' . "\r\n"
                    . 'Authorization: Basic '. base64_encode("WEBCFIRE.VOSTOK@MAIL.RU:ng2pP4R1zZz") . "\r\n",
            ],
        ]));

        $result = json_decode($result);

        return response()->json($result->RESP);
    }
}
