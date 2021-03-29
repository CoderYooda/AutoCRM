<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Carbon\Carbon;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7\Response;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

class FavoritParts implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://api.favorit-parts.ru/';

    protected $name = 'Фаворит Автозапчасти';
    protected $service_key = 'favoritparts';

    protected $api_key;

    /** @var Company */
    protected $company = null;

    /** @var User $user */
    protected $user = null;

    /** @var Client */
    protected $client;

    protected $errors = [
        403 => [
            'return' => 'Not auth'
        ],
        405 => [
            'return' => 'Not allowed'
        ]
    ];


    public function __construct()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $this->user = Auth::user();

        $this->company = $shop->company ?? $this->user->company;

        $this->api_key = $this->company->getServiceFieldValue($this->service_key, 'api_key');

        $this->client = new Client();
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'number'=> $article
        ];

        $response = $this->query('hs/hsprice/', $params);

        $results = [];

        foreach ($response['goods'] as $item) {
            $results[] = [
                'brand' => $item['brand'],
                'article' => $item['number'],
                'desc' => $item['name']
            ];
        }


        return $results;
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
            'analogues' => 'on'
        ];

        $response = $this->query('hs/hsprice/', $params);

        $unfilteredItems = $response['goods'];
        $unfilteredItems = array_first($unfilteredItems);

        $items = [];

        foreach ($unfilteredItems['analogues'] as $item) {
            foreach ($item['warehouses'] as $offer) {

                $items[] = [
                    'goodsID' => $item['goodsID'],
                    'brand' => $item['brand'],
                    'count' => $offer['stock'],
                    'name' => $item['name'],
                    'number' => $item['number'],
                    'price' => $offer['price'],
                    'shipmentDate' => $offer['shipmentDate'],
                    'rate' => $item['rate'],
                    'warehouse_name' => $offer['code'],
                    'warehouse_id' => $offer['id'],
                    'own' => $offer['own'],
                    'warehouseShipping' => $offer['warehouseShipping'],
                    'supplier' => $this->name
                ];
            }
        }

        unset($unfilteredItems['analogues']);

        foreach ($unfilteredItems['warehouses'] as $offer) {
            $items[] = [
                'goodsID' => $unfilteredItems['goodsID'],
                'brand' => $unfilteredItems['brand'],
                'count' => $offer['stock'],
                'name' => $unfilteredItems['name'],
                'number' => $unfilteredItems['number'],
                'price' => $offer['price'],
                'shipmentDate' => $offer['shipmentDate'],
                'rate' => $unfilteredItems['rate'],
                'warehouse_name' => $offer['code'],
                'warehouse_id' => $offer['id'],
                'own' => $offer['own'],
                'warehouseShipping' => $offer['warehouseShipping'],
                'supplier' => $this->name
            ];
        }


        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if ($items == []) return $results;

        $originalIndex = 0;
        $analogueIndex = 0;

        foreach ($items as $key => $item) {

            $now = Carbon::now();
            $deliveryDate = Carbon::parse($item['shipmentDate']);
            $days = $now->diffInDays($deliveryDate);

            $items[$key]['index'] = $key;

            $items[$key]['hash_info'] = [
                'stock' => $item['warehouse_name'],
                'manufacturer' => $item['brand'],
                'article' => $item['number'],
                'days' => $days,
                'price' => $item['price'],
                'packing' => $item['rate'] > 0 ? $item['rate'] : 1,
                'desc' => $item['name'],
                'rest' => $item['count'],
                'supplier' => $this->name
            ];
        }

        foreach ($items as $store) {

            $is_analogue = $store['brand'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['name'],
                'code' => $store['goodsID'],
                'rest' => $store['count'],
                'days_min' => $store['hash_info']['days'],
                'days_max' => $store['hash_info']['days'],
                'packing' => $store['rate'] > 0 ? $store['rate'] : 1,
                'min_count' => $store['rate'] > 0 ? $store['rate'] : 1,
                'delivery' => $store['hash_info']['days'] . ' дн.',
                'price' => $store['price'],
                'manufacturer' => $store['brand'],
                'article' => $store['number'],
                'model' => $store,
                'stock' => $store['warehouse_name'],
                'can_return' => 'n/a',
                'hash' => md5($store['warehouse_name'] . $store['brand'] . $store['number'] . $store['hash_info']['days'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($action, $params = [], $method ='GET')
    {
        $url = $this->host . $action;

        $bodyType = $method == 'GET' ? 'query': 'body';

        if ($bodyType == 'query') {
            $params['key'] = $this->api_key;

        }

        $params = $bodyType == 'query' ? http_build_query($params) : json_encode($params);

        try {

            $result = $this->client->request($method, $url, [

                $bodyType => $params,
                'headers' => [
                    'Content-Type'=>'application/json',
                    'X-Favorit-ClientKey' => $this->api_key,
                    'X-Favorit-DeveloperKey' => '903EB8A5-2ECF-4B23-94CA-FB88E4FD1FEE'
                ]
            ]);

        }
        catch (\Exception $exception) {
            $result = $exception;
        }

        $this->errorHandler($result);

        $json = $result->getBody();

        $result = json_decode($json ,true);

        return $result;

    }

    private function errorHandler($response) : void
    {
        $methods = [
            'Response' => 'getStatusCode',
            'ClientException' => 'getCode'
        ];

        $class = class_basename($response);

        $method = $methods[$class];

        $errorCode = $response->$method();

        foreach ($this->errors as $code => $info) {
            if ($errorCode != $code) continue;
            throw new \Exception($info['return'], $code);
        }

        $json = $response->getBody();

        $result = json_decode($json ,true);


        if(empty($result['goods'][0]['brand']) && isset($result['goods'][0]['brand'])) {

            throw new \Exception('Not fond', 404);
        }
    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if(!isset($fields['api_key'])) return false;

        $this->api_key = $fields['api_key'];

        //Если эксепшен не был выкинут, то пропускаем

        $this->searchBrandsCount('k1279');

        return true;

    }

    public function sendOrder(array $data): bool
    {
        $this->query('ws/v1/cart/clean/'); //Очистка корзины

        $products = [];

        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $products = [
                'goods' => $orderInfo['code'],
                'warehouseGroup' => $orderInfo['model']['warehouse_id'],
                'count' => $product->count
            ];

            $this->query('ws/v1/cart/add/',$products); //Добавление в корзину
        }

        $cart = $this->query('ws/v1/cart/',$products); //Получение корзины

        $stocks = array_column($cart['cart'],'warehouseShipping');

        $stocks = array_unique($stocks); // Достаем уникальные имена складов для группировки заказа пол скаду

        $arrayDate = [];

        foreach ($cart['cart'] as $product) {

            $arrayDate[] = $product['dateShipment'];
        }

        $deliveryDate = date_create(max($arrayDate))->format('Ymd'); // Берем максимальную дату доставки

        $listGoods = [];

        foreach ($stocks as $stock) {

            foreach ($cart['cart'] as $product) {

                if ($product['warehouseShipping'] != $stock) continue;

                $listGoods[] =[
                    'Goods' => $product['goods'],
                    'WarehouseGroup' => $product['warehouseGroup'],
                    'Count' => $product['count'],
                    'Comment' => ''
                ];
            }

            $params = [
                'WarehouseShipping' => $stock,
                'ShippingDate' => $deliveryDate,
                'TradePoint' => $data['delivery_type_id'] == 2 ? array_key_first($this->getDeliveryToAddresses()) : $data['delivery_address_id'],
                'PaymentType' => $data['payment_type_id'],
                'DeliveryType' => $data['delivery_type_id'],
                'TransportType' => '1',
                'GoodsList' => $listGoods,
                'Comment' => $data['comment']
            ];

            $this->query('ws/v1/order/', $params, 'POST'); // Заказ для текузего склада в цикле
        }

        $this->createProviderOrder($data);

        return true;
    }

    public function getPickupAddresses(): array
    {
        return [];
    }

    public function getDeliveryToAddresses(): array
    {
        $request = $this->query('ws/v1/references/profile/');
        $addresses = [];
        foreach ($request['tradePoints'] as $code => $address) {

            $addresses[$code] = $address['address'];
        }

        return $addresses;
    }

    public function getPaymentTypes(): array
    {
        return [
            '1' => 'Наличный расчет',
            '2' => 'Безналичный расчет'
        ];
    }

    public function getDeliveryTypes(): array
    {
        return [
            '2' => 'Самовывоз',
            '1' => 'Доставка'
        ];
    }

    public function getDateOfShipment(): array
    {
       return [];
    }

    public function getTimeOfShipment(): array
    {
        return [];
    }

    public function getOrdersStatuses(): array
    {
        return [];
    }

    public function getSubdivisions(): array
    {
        return [];
    }
}





