<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\PermissionController;
use App\Http\Requests\DeleteCartProviderRequest;
use App\Http\Requests\DeleteCartRequest;
use App\Http\Requests\Providers\Cart\AddCartRequest;
use App\Http\Requests\Providers\Cart\OrderCartRequest;
use App\Http\Requests\Providers\Cart\SetCartRequest;
use App\Services\ProviderService\Contract\CartInterface;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use App\Services\ProviderService\Services;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProviderStoreController extends Controller
{
    public function tableData(Request $request, Providers $providers)
    {
        PermissionController::canByPregMatch('Смотреть склады поставщиков');

        $request->search = preg_replace('/[^a-z\d]/', '', $request->search);

        $counts = [];
        $manufacturers = [];
        $errors = [];

        foreach ($providers->activated() as $service_key => $provider) {

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

    public function getStores(Providers $providers, Request $request, CartInterface $cart)
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

        $existedStores = DB::table('providers_cart')->whereIn('hash', $stores->pluck('hash'))->get();

        $stores = $stores->toArray();

        foreach ($stores as $key => $store) {

            $amount = $existedStores
                ->where('hash', $store['hash'])
                ->sum('count');

            $stores[$key]['count'] = $amount;
        }

        $view = view(get_template() . '.provider_stores.includes.table_element', compact('provider','stores', 'cart', 'request'));

        return response()->json([
            'html' => $view->render(),
            'stores' => array_column($stores, 'model')
        ]);
    }

    public function getArmTekSerialSales(Request $request)
    {
        $url = "http://ws.armtek.ru/api/ws_user/getUserVkorgList?format=json";

        $response = null;

        try {

            $response = file_get_contents($url, null, stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => 'Content-Type: application/json' . "\r\n"
                        . 'Authorization: Basic ' . base64_encode("{$request->login}:{$request->password}") . "\r\n",
                ],
            ]));
        }
        catch (\Exception $exception) {

            return response()->json([
                'type' => 'error',
                'message' => 'Ошибка авторизации: Проверьте правильность ввода логина и пароля, а так же IP адреса.'
            ], 422);
        }

        $result = json_decode($response, true);

        return response()->json([
            'params' => $result['RESP']
        ]);
    }

    public function addCart(CartInterface $cart, AddCartRequest $request)
    {
        $cart->addProduct($request->provider_key, $request->article, $request->product);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт добавлен в корзину.'
        ], 200);
    }

    public function setCart(CartInterface $cart, SetCartRequest $request)
    {
        $cart->setProductCount($request->provider_key, $request->article, $request->product, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Кол-во было изменено.'
        ]);
    }

    public function deleteCart(CartInterface $cart, DeleteCartRequest $request)
    {
        $cart->removeProductById($request->id);

        return response()->json([
            'type' => 'success',
            'message' => 'Позиция успешно удалена.'
        ]);
    }

    public function deleteCartProvider(CartInterface $cart, DeleteCartProviderRequest $request)
    {
        $cart->clearByProviderKey($request->provider_key);

        return response()->json([
            'type' => 'success',
            'message' => 'Позиции успешно удалена.'
        ]);
    }

    public function resetCart(CartInterface $cart)
    {
        $cart->clear();

        return response()->json([
            'type' => 'success',
            'message' => 'Корзина успешно очищена.'
        ]);
    }

    public function orderCart(CartInterface $cart, Providers $providers, OrderCartRequest $request)
    {
        $ordersCollection = $cart->getProducts();

        $ordersKeys = $ordersCollection->pluck('provider_key')->unique()->toArray();

        $orders = [];

        foreach ($ordersCollection as $order) {

            if(isset($request->orders[$order->id]['count'])) {
                $order->count = $request->orders[$order->id]['count'];
            }

            $orders[$order->provider_key][] = $order;
        }

        /** @var ProviderInterface $provider */
        foreach ($providers->activated() as $provider_key => $provider) {

            if(!in_array($provider_key, $ordersKeys)) continue;

            $providerParams = $request->providers[$provider_key];

            $data = [
                'orders' => $orders[$provider_key],
                'comment' => $request->comments[$provider_key],
                'delivery_type_id' => $providerParams['delivery_type_id'] ?? null,
                'payment_type_id' => $providerParams['payment_type_id'] ?? null,
                'pickup_address_id' => $providerParams['pickup_address_id'] ?? null,
                'delivery_address_id' => $providerParams['delivery_address_id'] ?? null,
                'date_shipment_id' => $providerParams['date_shipment_id'] ?? null
            ];

            $provider->sendOrder($data);
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Заявки поставщикам были успешно отправлены.'
        ]);
    }

    public static function providerCartDialog(Request $request)
    {
        $providers = app(Providers::class);
        $cart = app(CartInterface::class);

        PermissionController::canByPregMatch('Создавать заявки поставщикам через корзину');

        $class = 'providerCartDialog';

        $ordersCollection = $cart->getProducts();

        $KEY = 'orders.' . Auth::id();

        $deliveryInfo = Cache::remember($KEY, Carbon::now()->addHour(), function () use($providers) {

            $deliveryInfo = [];

            /** @var ProviderInterface $provider */
            foreach ($providers->activated() as $service_key => $provider) {

                $deliveryInfo[$service_key] = [
                    'Список адресов доставки' => [
                        'params' => $provider->getDeliveryToAddresses(),
                        'field' => 'delivery_address_id',
                        'onclick' => 'changeDeliveryAddress'
                    ],
                    'Список офисов самовывоза' => [
                        'params' => $provider->getPickupAddresses(),
                        'field' => 'pickup_address_id'
                    ],
                    'Список способов доставки' => [
                        'params' => $provider->getDeliveryTypes(),
                        'field' => 'delivery_type_id'
                    ],
                    'Список способов оплаты' => [
                        'params' => $provider->getPaymentTypes(),
                        'field' => 'payment_type_id'
                    ],
                    'Список дат отгрузки' => [
                        'params' => $provider->getDateOfShipment(),
                        'field' => 'date_shipment_id'
                    ]
                ];
            }

            return $deliveryInfo;
        });

        $orders = [];
        $providersInfo = [];

        foreach ($ordersCollection as $order) {

            $provider_key = $order->provider_key;

            $order->data = json_decode($order->data);

            $orders[$provider_key][] = $order;

            $total = $order->data->hash_info->price * $order->count;

            if(!isset($providersInfo[$provider_key]['count'])) $providersInfo[$provider_key]['count'] = 0;
            if(!isset($providersInfo[$provider_key]['total_price'])) $providersInfo[$provider_key]['total_price'] = 0;
            if(!isset($providersInfo[$provider_key]['positions'])) $providersInfo[$provider_key]['positions'] = 0;

            $providersInfo[$provider_key]['count'] += $order->count;
            $providersInfo[$provider_key]['total_price'] += $total;
            $providersInfo[$provider_key]['positions'] ++;
        }

        $providersInfo = collect($providersInfo);

        $view = view(get_template() . '.provider_stores.dialog.form_cart_provider', compact('class', 'request', 'orders', 'deliveryInfo', 'providersInfo'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }
}
