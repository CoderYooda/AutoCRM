<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Providers\Cart\AddCartRequest;
use App\Http\Requests\Providers\Cart\SetCartRequest;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use App\Services\ProviderService\Services;
use App\Services\ProviderService\Services\Cart\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use function foo\func;

class ProviderStoreController extends Controller
{
    public function tableData(Request $request, Providers $providers, Cart $cart)
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

    public function getStores(Providers $providers, Request $request, Cart $cart)
    {
        $selected_service = $request->selected_service;
        $article = $request->article;
        $manufacturer = $request->manufacturer;

        /** @var ProviderInterface $provider */
        $provider = $providers->find($selected_service);

        $stores = $provider->getStoresByArticleAndBrand($article, $manufacturer);

        foreach ($stores as $key => $store) {
            $stores[$key]['count'] = 0;
        }

        $stores = collect($stores);

        if($request->sort == 'price') {
            $stores = $stores->sortBy('price');
        }
        else if($request->sort == 'days') {
            $stores = $stores->sortBy('days_min');
        }

        if($request->is_desc == true) $stores = $stores->reverse();

        $existedStores = DB::table('providers_cart')->whereIn('stock', $stores->pluck('model'))->get();

        $stores = $stores->toArray();

        foreach ($stores as $key => $store) {

            $amount = $existedStores
                ->where('data', $store['model'])
                ->sum('count');

            $stores[$key]['count'] = $amount;
        }

        $view = view(get_template() . '.provider_stores.includes.table_element', compact('provider','stores', 'cart', 'request'));

        return response()->json([
            'html' => $view->render(),
            'stores' => $stores
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

    public function addCart(Cart $cart, AddCartRequest $request)
    {
        dd($request->all());

        $cart->addProduct($request->provider_key, $request->stock, $request->delivery_key, $request->manufacturer, $request->article, $request->price);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт добавлен в корзину.'
        ], 200);
    }

    public function setCart(Cart $cart, SetCartRequest $request)
    {
        $cart->setProductCount($request->provider_key, $request->stock, $request->delivery_key, $request->manufacturer, $request->article, $request->price, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Кол-во было изменено.'
        ], 200);
    }

    public function orderCart(Providers $providers)
    {
        $user_id = Auth::id();

        $ordersCollection = DB::table('providers_cart')->where('user_id', $user_id)->get();

        $ordersKeys = $ordersCollection->pluck('provider_key')->unique('provider_key')->toArray();

        $orders = [];

        foreach ($ordersCollection as $order) {
            $orders[$order->provider_key][] = $order;
        }

        /** @var ProviderInterface $provider */
        foreach ($providers->activated() as $provider) {
            $key = $provider->getServiceKey();

            if(!in_array($key, $ordersKeys)) continue;

            $provider->sendOrder($orders[$key]);

            DB::table('providers_cart')->where([
                'user_id' => $user_id,
                'provider_key' => $key
            ])->delete();
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Заявки поставщикам были успешно отправлены.'
        ]);
    }

    public static function ProviderCartDialog(Request $request)
    {
        $class = 'providerCartDialog';

        $ordersCollection = DB::table('providers_cart')->where('user_id', Auth::id())->get();

        $orders = [];

        foreach ($ordersCollection as $order) {
            $orders[$order->provider_key][] = $order;
        }

        $view = view(get_template() . '.provider_stores.dialog.form_cart_provider', compact('class', 'request', 'orders'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }
}
