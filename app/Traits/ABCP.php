<?php

namespace App\Traits;

use App\Http\Controllers\SupplierController;
use App\Http\Requests\SupplierRequest;
use App\Models\Article;
use App\Models\CartProviderOrder;
use App\Models\Company;
use App\Models\Partner;
use App\Models\ProviderOrder;
use App\Models\User;
use App\Services\ProviderService\Contract\CartInterface;
use App\Services\ProviderService\Services\Cart\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait ABCP
{
    /** @var Company */
    protected $company = null;

    protected $login = null;
    protected $password = null;

    /** @var User $user */
    protected $user = null;

    public function __construct()
    {
        $this->company = Auth::user()->company;
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
            'number' => $article,
            'brand' => $brand,
            'useOnlineStocks' => 1
        ];

        $items = $this->query('search/articles/', $params, 'GET');

        foreach ($items as $key => $item) {

            $items[$key]['index'] = $key;

            $items[$key]['hash_info'] = [
                'stock' => $item['supplierCode'],
                'manufacturer' => $item['brand'],
                'article' => $article,
                'days' => $item['deliveryPeriod'],
                'price' => $item['price']
            ];

        }

        $results = [];

        foreach ($items as $key => $item) {

            $min_days = $item['deliveryPeriod'] / 24;
            $max_days = $item['deliveryPeriodMax'] ?? 1 / 24;

            $results[] = [
                'index' => $item['index'],
                'name' => $item['supplierCode'],
                'code' => $item['number'],
                'delivery' => $min_days . ($max_days > $min_days ?  ('/' . $max_days) : ''),
                'days_min' => $min_days,
                'days_max' => $max_days,
                'price' => $item['price'],
                'manufacturer' => $item['brand'],
                'stock' => $item['supplierCode'],
                'model' => $item,
                'hash' => md5($item['supplierCode'] . $item['brand'] . $article . $item['deliveryPeriod'] . $item['price'])
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

        if($method == 'GET') $full_path .= ('?' . http_build_query($params));

        $context = [
            'http' => [
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'method' => $method
            ],
        ];

        if($method == 'POST') {
            $context['http']['content'] = http_build_query($params);
        }

        try {
            $result = file_get_contents($full_path, null, stream_context_create($context));
        }
        catch (\Exception $exception)
        {
            dd($exception->getMessage());
        }

        $result = (array)json_decode($result, true);

        if(array_key_exists('errorCode', $result) && $result['errorMessage'] != 'No results') {
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
        if(!isset($fields['login']) || !isset($fields['password'])) return false;

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
            $results[ $office['id'] ] = $office['name'];
        }

        return $results;
    }

    //	Получение списка адресов доставки
    public function getDeliveryToAddresses(): array
    {
        $response = $this->query('basket/shipmentAddresses', [], 'GET');

        $results = [];

        foreach ($response as $delivery) {
            $results[ $delivery['id'] ] = $delivery['name'];
        }

        return $results;
    }

    //Получение списка способов оплаты
    public function getPaymentTypes(): array
    {
        $response = $this->query('basket/paymentMethods', [], 'GET');

        $results = [];

        foreach ($response as $payment) {
            $results[ $payment['id'] ] = $payment['name'];
        }

        return $results;
    }

    //	Получение списка способов доставки
    public function getDeliveryTypes(): array
    {
        $response = $this->query('basket/shipmentMethods', [], 'GET');

        $results = [];

        foreach ($response as $type) {
            $results[ $type['id'] ] = $type['name'];
        }

        return $results;
    }

    //	Получение списка дат отгрузки
    public function getDateOfShipment(): array
    {
        $response = $this->query('basket/shipmentDates', [], 'GET');

        $results = [];

        foreach ($response as $date) {
            $results[ $date['date'] ] = $date['name'];
        }

        return $results;
    }

    public function getOrdersStatuses(): array
    {
        $numbers = CartProviderOrder::where([
            'company_id' => $this->company->id,
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
                'number' => $orderInfo->number,
                'brand' => $orderInfo->brand,
                'supplierCode' => $orderInfo->supplierCode,
                'itemKey' => $orderInfo->itemKey,
                'quantity' => $order->count
            ];
        }

        $params = [
            'positions' => $orders,
            'shipmentMethod' => $data['delivery_type_id'],
            'paymentMethod' => $data['payment_type_id'],
            'shipmentAddress' => $data['delivery_address_id'],
            'shipmentOffice' => $data['pickup_address_id'],
            'shipmentDate' => $data['date_shipment_id'],
            'comment' => $data['comment']
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
        $cart = app(Cart::class);
        $cart->clearByProviderKey($this->service_key);

        //--------- Создание заявки поставщику на складе

        $products = [];

        $supplierController = new SupplierController();
        $supplierRequest = new SupplierRequest();

        $totalPrice = 0;
        $totalCount = 0;

        foreach ($data['orders'] as $order) {
            $orderInfo = json_decode($order->data, true);

            //Создание производителя
            $supplierRequest['name'] = $orderInfo['brand'];

            $supplierController->store($supplierRequest);
            $supplier = $supplierController::$supplier;

            //Создание продукта

            $uniqueFields = [
                'supplier_id' => $supplier->id,
                'article' => $orderInfo['hash_info']['article']
            ];

            $dataFields = [
                'company_id' => $this->company->id,
                'category_id' => 2,
                'creator_id' => $this->user->id,
                'supplier_id' => $supplier->id,
                'foundstring' => Article::makeFoundString($orderInfo['hash_info']['article'] . $supplier->name . $orderInfo['description']),
                'article' => $orderInfo['hash_info']['article'],
                'name' => $orderInfo['description'],
                'fapi_id' => $supplier->fapi_id ?? null
            ];

            $product = Article::firstOrCreate($uniqueFields, $dataFields);

            $products[] = [
                'id' => $product->id,
                'count' => $order->count,
                'price' => $orderInfo['hash_info']['price']
            ];

            $totalPrice += $orderInfo['hash_info']['price'] * $order->count;
            $totalCount += $order->count;
        }

        $providerPartner = Partner::firstOrCreate([
            'company_id' => $this->company->id,
            'category_id' => 6,
            'store_id' => $this->user->current_store,
            'type' => 2,
            'comment' => 'Автоматически созданный контакт',
            'opf' => 'ООО',
            'companyName' => $this->name,
        ]);

        $providerOrder = ProviderOrder::create([
            'company_id' => $this->company->id,
            'store_id' => $this->user->current_store,
            'partner_id' => $providerPartner->id,
            'manager_id' => $this->user->partner->id,
            'nds' => 1,
            'nds_included' => 1,
            'itogo' => $totalPrice
        ]);

        foreach ($products as $product) {

            $totalPrice = ($product['price'] * $product['count']);

            DB::table('article_provider_orders')->insert([
                'article_id' => $product['id'],
                'provider_order_id' => $providerOrder->id,
                'count' => $product['count'],
                'price' => $product['price'],
                'total' => $totalPrice,
                'nds' => ($totalPrice / 100) * 20,
                'nds_percent' => 20,
                'nds_included' => 1
            ]);
        }

        return true;
    }
}
