<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

class Berg implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://api.berg.ru/v1.0';

    protected $name = 'Берг';
    protected $service_key = 'berg';

    protected $api_key;

    /** @var Company */
    protected $company = null;

    /** @var User $user */
    protected $user = null;

    /** @var Client */
    protected $client;

    protected $errors = [
        401 => [
            'return' => 'Not auth'
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
            'items' => [
                [
                    'resource_article' => $article
                ]
            ]
        ];

        $response = $this->query('/ordering/get_stock', $params);


        $response = array_column($response['resources'], 'brand');

        $response = array_column($response,'name');

        return $response;
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
            'items' => [
                [
                    'resource_article' => $article,
                    'brand_name' => $brand
                ]
            ],
            'analogs' => 1
        ];

        $response = $this->query('/ordering/get_stock', $params);

        $unfilteredItems = $response['resources'];

        $items = [];

        foreach ($unfilteredItems as $item) {
            foreach ($item['offers'] as $offer) {
                $items[] = [
                    'resource_id' => $item['id'],
                    'stock' => $offer['warehouse']['name'],
                    'brand' => $item['brand']['name'],
                    'article' => $item['article'],
                    'days' => $offer['assured_period'],
                    'price' => $offer['price'],
                    'packing' => $offer['multiplication_factor'],
                    'desc' => $item['name'],
                    'rest' => $offer['quantity'],
                    'supplier' => $this->name,
                    'code' => $offer['warehouse']['id'],
                    'days_min' => $offer['average_period'],
                    'days_max' => $offer['assured_period'],
                    'delivery_type' => $offer['delivery_type']
                ];
            }
        }

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if ($items == []) return $results;

        $originalIndex = 0;
        $analogueIndex = 0;

        foreach ($items as $key => $item) {

            $items[$key]['index'] = $key;

            $items[$key]['hash_info'] = [
                'stock' => $item['stock'],
                'manufacturer' => $item['brand'],
                'article' => $item['article'],
                'days' => $item['days'],
                'price' => $item['price'],
                'packing' => $item['packing'] > 0 ? $item['packing'] : 1,
                'desc' => $item['desc'],
                'rest' => $item['rest'],
                'supplier' => $this->name
            ];
        }

        foreach ($items as $store) {

            $is_analogue = $store['brand'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['desc'],
                'code' => $store['code'],
                'rest' => $store['rest'],
                'days_min' => $store['days_min'],
                'days_max' => $store['days_max'],
                'packing' => $store['packing'] > 0 ? $store['packing'] : 1,
                'min_count' => $store['packing'] > 0 ? $store['packing'] : 1,
                'delivery' => $store['days'] . ' дн.',
                'price' => $store['price'],
                'manufacturer' => $store['brand'],
                'article' => $store['article'],
                'model' => $store,
                'stock' => $store['stock'],
                'can_return' => 'n/a',
                'hash' => md5($store['stock'] . $store['brand'] . $store['article'] . $store['days'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($action, $params = [], $method ='GET')
    {
        $url = $this->host . $action;

        $bodyType = $method == 'GET' ? 'query': 'body';

        try {
            $result = $this->client->request($method, $url, [

                $bodyType => http_build_query($params),
                'headers' => [
                    'Content-Type'=>'application/x-www-form-urlencoded',
                    'X-Berg-API-Key' => '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e730'
                ]]);
        }
        catch (\Exception $exception) {
          $result =$exception;
        }

        $this->errorHandler($result);

        $json = $result->getBody();

        $result = json_decode($json, true);

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

        $result = json_decode($json, true);

        if (isset($result['resources']) && empty($result['resources']))
            throw new \Exception('Not found', 404);
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
        $products = [];

        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $products[] = [
                'resource_id' => $orderInfo['model']['resource_id'],
                'warehouse_id' => $orderInfo['model']['code'],
                'quantity' => $product->count
            ];
        }

        $params = [
            'order' => [
                'is_test' => 1,
                'payment_type' => $data['payment_type_id'],
                'dispatch_type' => $data['delivery_type_id'],
                'dispatch_at' => $data['date_shipment_id'],
                'dispatch_time' => 1, //Тестовое (метод времени отправки не реализован на фронте
                'comment' => $data['comment'],
                'shipment_address_id' => $data['delivery_address_id'],
                'items' => $products
            ]
        ];

        if($params['order']['dispatch_type'] == 2) {

            unset($params['order']['shipment_address_id']);
        }

        $this->query('/ordering/place_order', $params, 'POST'); //Подтверждение заказа

        $this->createProviderOrder($data);

        return true;
    }

    public function getPickupAddresses(): array
    {
        return [];
    }

    public function getDeliveryToAddresses(): array
    {
        $request = $this->query('/references/shipment_address/active');

        if ($request == []) return $request;

        $request =$request['shipment_address_list'];

        $deliveryAddress =[];

        foreach ($request as $address) {

            if ($address['state'] == 1) {

                $deliveryAddress[$address['id']] = $address['address'];

            }
        }

        return $deliveryAddress;
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
            '3' => 'Доставка'
        ];
    }

    public function getDateOfShipment(): array
    {
        $currentDate = Carbon::now();

        $dates = [];

        for($i = 0; $i < 30; $i++) {

            $currentDate = $currentDate->addDay();

            $dates[$currentDate->format('Y-m-d')] = $currentDate->format('d.m.Y');
        }

        return $dates;
    }

    public function getTimeOfShipment(): array
    {
        return [
            '1' => 'До 15:00',
            '2' => 'После 15:00'
        ];
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





