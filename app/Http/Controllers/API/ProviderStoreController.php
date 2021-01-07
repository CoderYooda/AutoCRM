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
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ProviderStoreController extends Controller
{
    public function tableData(Request $request, Providers $providers)
    {
        PermissionController::canByPregMatch('Смотреть склады поставщиков');

//        $request->search = preg_replace('/[^a-z\d]/', '', $request->search);

        $counts = [];
        $manufacturers = [];
        $errors = [];

        foreach ($providers->activated() as $service_key => $provider) {

            try {
                $counts[$service_key] = $request->search ? $provider->searchBrandsCount((string)$request->search) : [];
            }
            catch (\Exception $exception) {

                $code = $exception->getCode();

                $counts[$service_key] = [];
                if($code != 404) $errors[$service_key] = Providers::getErrorMessageByCode($code);
            }

            if ($service_key == $request->selected_service) {
                $manufacturers = $counts[$service_key];
            }
        }

        $view = view(get_template() . '.provider_stores.includes.manufacturers', compact('manufacturers', 'request'));

        return response()->json([
            'counts' => $counts,
            'html' => $view->render(),
            'errors' => $errors
        ]);
    }

    public function getStores(Request $request, CartInterface $cart)
    {
        $stores = $this->getWarehouses($request);

        $view = view(get_template() . '.provider_stores.includes.warehouses', compact('stores', 'request'));

        return response()->json([
            'html' => $view->render(),
            'stores' => $stores
        ]);
    }

    public function getStoresFilter(Request $request, CartInterface $cart)
    {
        $stores = $this->getWarehouses($request);

        $view = view(get_template() . '.provider_stores.includes.table_items', compact('stores', 'request'))
            ->with('type', $request->type);

        return response()->json([
            'html' => $view->render(),
            'stores' => $stores
        ]);
    }

    private function getWarehouses(Request $request)
    {
        $providers = app(Providers::class);

        $selected_service = $request->selected_service;
        $article = $request->product;
        $manufacturer = $request->manufacturer;

        /** @var ProviderInterface $provider */
        $provider = $providers->find($selected_service);

        try {
            $stores = $provider->getStoresByArticleAndBrand($article, $manufacturer);
        }
        catch (\Exception $exception) {
            $stores = [
                'originals' => [],
                'analogues' => []
            ];
        }

        $hashes = [];

        foreach (['originals', 'analogues'] as $type) {
            foreach ($stores[$type] as $key => $store) {
                $stores[$type][$key]['count'] = 0;
            }

            $addHashed = array_column($stores[$type], 'hash');
            $hashes = array_merge($hashes, $addHashed);
        }

        $stores = collect($stores);

        foreach (['originals', 'analogues'] as $type) {

            if($request->field) {
                $stores[$type] = collect($stores[$type])->sortBy($request->field, $request->is_desc ? SORT_DESC : SORT_ASC)->toArray();
            }

            if($request->is_desc == true) $stores[$type] = array_reverse($stores[$type]);
        }

        $existedStores = DB::table('providers_cart')->whereIn('hash', $hashes)->get();

        $stores = $stores->toArray();

        foreach (['originals', 'analogues'] as $type) {

            foreach($stores[$type] as $key => $store) {

                $amount = $existedStores
                    ->where('hash', $store['hash'])
                    ->sum('count');

                $stores[$type][$key]['count'] = $amount;
            }
        }

        return $stores;
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
        $cart->addProduct($request->provider_key, $request->product, $request->product, $request->count);

        return response()->json([
            'type' => 'success',
            'message' => 'Продукт добавлен в корзину.'
        ], 200);
    }

    public function setCart(CartInterface $cart, SetCartRequest $request)
    {
        $cart->setProductCount($request->provider_key, $request->product, $request->product, $request->count);

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
                'date_shipment_id' => $providerParams['date_shipment_id'] ?? null,
                'subdivision_id' => $providerParams['subdivision_id'] ?? null,
                'pickup_time_id' => $providerParams['pickup_time_id'] ?? null
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
        /** @var ProviderInterface[] $providers */
        $providers = app(Providers::class)->activated();
        $cart = app(CartInterface::class);

        PermissionController::canByPregMatch('Создавать заявки поставщикам через корзину');

        $class = 'providerCartDialog';

        $ordersCollection = $cart->getProducts();

        $deliveryInfo = [];

        foreach ($providers as $service_key => $provider) {

            $deliveryInfo[$service_key] = [
                'Список способов доставки' => [
                    'params' => $provider->getDeliveryTypes(),
                    'field' => 'delivery_type_id',
                    'onchange' => 'changeDeliveryType'
                ],
                'Список адресов доставки' => [
                    'params' => $provider->getDeliveryToAddresses(),
                    'field' => 'delivery_address_id',
                    'onchange' => 'changeDeliveryAddress'
                ],
                'Список офисов самовывоза' => [
                    'params' => $provider->getPickupAddresses(),
                    'field' => 'pickup_address_id'
                ],
                'Список способов оплаты' => [
                    'params' => $provider->getPaymentTypes(),
                    'field' => 'payment_type_id'
                ],
                'Список дат отгрузки' => [
                    'params' => $provider->getDateOfShipment(),
                    'field' => 'date_shipment_id'
                ],
                'Выставление счёта' => [
                    'params' => $provider->getSubdivisions(),
                    'field' => 'subdivision_id'
                ],
            ];
        }

        $orders = [];
        $providersInfo = [];

        foreach ($ordersCollection as $order) {

            $provider_key = $order->provider_key;

            if(!in_array($provider_key, array_keys($providers))) continue;

            $order->data = json_decode($order->data);

            $orders[$provider_key][] = $order;

            $total = $order->data->model->hash_info->price * $order->count;

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
