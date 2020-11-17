<?php

namespace App\Traits;

use App\Models\CartProviderOrder;
use App\Models\Company;
use App\Models\User;
use App\Services\ProviderService\Contract\CartInterface;
use App\Services\ShopManager\ShopManager;
use Exception;
use Illuminate\Support\Facades\Auth;

trait ABCP
{
    use CartProviderOrderCreator;

    /** @var Company */
    protected $company = null;

    protected $login = null;
    protected $password = null;

    /** @var User $user */
    protected $user = null;

    public function __construct()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $this->company = $shop->company ?? Auth::user()->company;
        $this->user = Auth::user();

        $this->login = $this->company->getServiceFieldValue($this->service_key, 'login');
        $this->password = md5($this->company->getServiceFieldValue($this->service_key, 'password'));
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'number' => $article
        ];

        $result = $this->query('search/brands/', $params, 'GET');

        return array_column($result, 'brand');
    }

    public function searchAnaloguesByBrandAndArticle(string $brand, string $article): array
    {
        //
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getServiceKey(): string
    {
        return $this->service_key;
    }

    public function isActivated(): bool
    {
        return (bool)$this->company->isServiceProviderActive($this->service_key);
    }

    public function getStoresByArticleAndBrand(string $article, string $brand): array
    {
        $params = [
            'number'          => $article,
            'brand'           => $brand,
            'useOnlineStocks' => 1,
            'withOutAnalogs'  => 1
        ];

        $items = $this->query('search/articles/', $params, 'GET');

        foreach ($items as $key => $item) {

            $items[$key]['index'] = $key;

            $items[$key]['hash_info'] = [
                'stock'        => $item['supplierCode'],
                'manufacturer' => $item['brand'],
                'article'      => $article,
                'days'         => $item['deliveryPeriod'],
                'price'        => $item['price'],
                'packing'      => $item['packing'],
                'desc'         => $item['description'],
                'rest'         => $item['availability'],
                'supplier'     => $this->name
            ];

        }

        $results = [];

        foreach ($items as $key => $item) {

            $min_days = $item['deliveryPeriod'] / 24;
            $max_days = $item['deliveryPeriodMax'] ?? 1 / 24;

            $results[] = [
                'index'        => $item['index'],
                'name'         => $item['supplierCode'],
                'code'         => $item['number'],
                'rest'         => $item['availability'],
                'packing'      => $item['packing'],
                'delivery'     => $min_days . ($max_days > $min_days ? ('/' . $max_days) : ''),
                'days_min'     => $min_days,
                'days_max'     => $max_days,
                'price'        => $item['price'],
                'manufacturer' => $item['brand'],
                'stock'        => $item['supplierCode'],
                'model'        => $item,
                'hash'         => md5($item['supplierCode'] . $item['brand'] . $article . $item['deliveryPeriod'] . $item['price'])
            ];
        }

        return $results;
    }

    private function query($path, $params, $method): array
    {
        $params['userlogin'] = $this->login;
        $params['userpsw'] = $this->password;
        $params['locale'] = 'ru_RU';

        $full_path = $this->host . $path;

        if ($method == 'GET') $full_path .= ('?' . http_build_query($params));

        $context = [
            'http' => [
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'method' => $method
            ],
        ];

        if ($method == 'POST') {
            $context['http']['content'] = http_build_query($params);
        }

        $result = [];

        try {
            $result = file_get_contents($full_path, null, stream_context_create($context));
            $result = (array)json_decode($result, true);
        } catch (Exception $exception) {
//            dd($exception);
        }

        if (array_key_exists('errorCode', $result) && $result['errorMessage'] != 'No results') {
            throw_error('AvtoImport: Ошибка авторизации логина или пароля.');
        }

        return $result;
    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if (!isset($fields['login']) || !isset($fields['password'])) return false;

        $this->login = $fields['login'];
        $this->password = md5($fields['password']);

        $this->searchBrandsCount('k1279');

        return true;
    }

    // Получение списка офисов самовывоза
    public function getPickupAddresses(): array
    {
        $response = $this->query('basket/shipmentOffices', [], 'GET');

        $results = [];

        foreach ($response as $office) {
            $results[$office['id']] = $office['name'];
        }

        return $results;
    }

    //	Получение списка адресов доставки
    public function getDeliveryToAddresses(): array
    {
        $response = $this->query('basket/shipmentAddresses', [], 'GET');

        $results = [];

        foreach ($response as $delivery) {
            $results[$delivery['id']] = $delivery['name'];
        }

        return $results;
    }

    //Получение списка способов оплаты
    public function getPaymentTypes(): array
    {
        $response = $this->query('basket/paymentMethods', [], 'GET');

        $results = [];

        foreach ($response as $payment) {
            $results[$payment['id']] = $payment['name'];
        }

        return $results;
    }

    //	Получение списка способов доставки
    public function getDeliveryTypes(): array
    {
        $response = $this->query('basket/shipmentMethods', [], 'GET');

        $results = [];

        foreach ($response as $type) {
            $results[$type['id']] = $type['name'];
        }

        return $results;
    }

    //	Получение списка дат отгрузки
    public function getDateOfShipment(): array
    {
        $response = $this->query('basket/shipmentDates', [], 'GET');

        $results = [];

        foreach ($response as $date) {
            $results[$date['date']] = $date['name'];
        }

        return $results;
    }

    public function getOrdersStatuses(): array
    {
        $numbers = CartProviderOrder::where([
            'company_id'  => $this->company->id,
            'service_key' => $this->service_key
        ])->pluck('number')->toArray();

        $params = [
            'orders' => $numbers
        ];

        return $this->query('orders/list/', $params, 'GET');
    }

    public function sendOrder(array $data): bool
    {
        //Очищаем корзину от заказов
        $this->query('basket/clear/', [], 'POST');

        $orders = [];

        foreach ($data['orders'] as $order) {
            $orderInfo = json_decode($order->data);

            $orders[] = [
                'number'       => $orderInfo->number,
                'brand'        => $orderInfo->brand,
                'supplierCode' => $orderInfo->supplierCode,
                'itemKey'      => $orderInfo->itemKey,
                'quantity'     => $order->count
            ];
        }

        $params = [
            'positions'       => $orders,
            'shipmentMethod'  => $data['delivery_type_id'],
            'paymentMethod'   => $data['payment_type_id'],
            'shipmentAddress' => $data['delivery_address_id'],
            'shipmentOffice'  => $data['pickup_address_id'],
            'shipmentDate'    => $data['date_shipment_id'],
            'comment'         => $data['comment']
        ];

//        $response = $this->query('orders/instant', $params, 'POST');
//
//        foreach ($response['orders'] as $order_id => $orderInfo) {
//            CartProviderOrder::create([
//                'company_id' => $this->user->company_id,
//                'user_id' => $this->user->id,
//                'service_key' => $this->service_key,
//                'number' => $order_id
//            ]);
//        }

        /** @var CartInterface $cart */
        $cart = app(CartInterface::class);
        $cart->clearByProviderKey($this->service_key);

        //--------- Создание заявки поставщику на складе

        $this->createProviderOrder($data);

        return true;
    }
}