<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\PermissionController;
use App\Http\Requests\DeleteCartRequest;
use App\Http\Requests\Providers\Cart\AddCartRequest;
use App\Http\Requests\Providers\Cart\OrderCartRequest;
use App\Http\Requests\Providers\Cart\SetCartRequest;
use App\Models\User;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ProviderService\Providers;
use App\Services\ProviderService\Services;
use App\Services\ProviderService\Services\Cart\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
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

    public function addCart(Cart $cart, AddCartRequest $request)
    {
        $cart->addProduct($request->provider_key, $request->article, $request->product);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт добавлен в корзину.'
        ], 200);
    }

    public function setCart(Cart $cart, SetCartRequest $request)
    {
        $cart->setProductCount($request->provider_key, $request->article, $request->product, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Кол-во было изменено.'
        ]);
    }

    public function deleteCart(Cart $cart, DeleteCartRequest $request)
    {
        $cart->removeProductById($request->id);

        return response()->json([
            'type' => 'success',
            'message' => 'Позиция успешно удалена.'
        ]);
    }

    public function resetCart(Cart $cart)
    {
        $cart->clear();

        return response()->json([
            'type' => 'success',
            'message' => 'Корзина успешно очищена.'
        ]);
    }

    public function orderCart(Cart $cart, Providers $providers, OrderCartRequest $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $ordersCollection = $cart->getProducts();

        $ordersKeys = $ordersCollection->pluck('provider_key')->unique('provider_key')->toArray();

        $orders = [];

        foreach ($ordersCollection as $order) {

            if(isset($request->orders[$order->id]['count'])) {
                $order->count = $request->orders[$order->id]['count'];
            }

            $orders[$order->provider_key][] = $order;
        }

        /** @var ProviderInterface $provider */
        foreach ($providers->activated() as $provider) {
            $provider_key = $provider->getServiceKey();

            if(!in_array($provider_key, $ordersKeys)) continue;

            $data = [
                'orders' => $orders[$provider_key],
                'comment' => $request->comment,
                'delivery_type_id' => $request->delivery_type_id,
                'payment_type_id' => $request->payment_type_id,
                'pickup_address_id' => $request->pickup_address_id,
                'delivery_address_id' => $request->delivery_address_id,
                'date_shipment_id' => $request->date_shipment_id,
            ];

            $provider->sendOrder($data);

            DB::table('providers_cart')->where([
                'user_id' => $user->id,
                'provider_key' => $provider_key
            ])->delete();
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Заявки поставщикам были успешно отправлены.'
        ]);
    }

    public static function providerCartDialog(Request $request)
    {
        $providers = app(Providers::class);
        $cart = app(Cart::class);

        PermissionController::canByPregMatch('Создавать заявки поставщикам через корзину');

        $class = 'providerCartDialog';

        $ordersCollection = $cart->getProducts();

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

        $orders = [];

        $total_price = 0;

        foreach ($ordersCollection as $order) {

            $order->data = json_decode($order->data);

            $orders[$order->provider_key][] = $order;

            $total_price += $order->data->hash_info->price * $order->count;
        }

        $view = view(get_template() . '.provider_stores.dialog.form_cart_provider', compact('class', 'request', 'orders', 'total_price', 'deliveryInfo'));

        return response()->json([
            'tag' => $class,
            'html' => $view->render()
        ]);
    }
}
