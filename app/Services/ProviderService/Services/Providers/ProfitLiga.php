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

class ProfitLiga implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'https://pr-lg.ru';

    protected $name = 'ПрофитЛига';
    protected $service_key = 'profitliga';

    protected $api_key;

    /** @var Company */
    protected $company = null;

    /** @var User $user */
    protected $user = null;

    /** @var Client */
    protected $client;

    /** @var array */
    protected $settings;

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
            'article' => $article
        ];

        $response = $this->query('/api/search/products', $params);

        $results = [];

        foreach ($response as $item) {
            $results[] = [
                'brand' => $item['brand'],
                'article' => $item['article'],
                'desc' => strlen($item['description']) ? $item['description'] : 'Не указано'
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
            'article' => $article,
            'brand' => $brand,
            'replaces' => 1
        ];

        $response = $this->query('/api/search/crosses', $params);

        $unfilteredItems = $response;

        $items = [];

        foreach ($unfilteredItems as $item) {
            foreach ($item['products'] as $offer) {
                $items[] = [
                    'resource_id' => intval($item['id']),
                    'stock' => $offer['custom_warehouse_name'],
                    'brand' => $item['brand'],
                    'article' => $item['article'],
                    'days' => intval(round($offer['delivery_time']/24,0)),
                    'price' => $offer['price'],
                    'packing' => intval($offer['multi']),
                    'desc' => $offer['description'],
                    'rest' => intval($offer['quantity']),
                    'product_code' => $offer['product_code'],
                    'supplier' => $this->name,
                    'code' => intval($offer['warehouse_id']),
                    'days_min' => 'n/a',
                    'days_max' => 'n/a',
                    'can_return' => boolval($offer['allow_return'])
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
                'can_return' => $store['can_return'] ? 'Да' : 'Нет',
                'hash' => md5($store['stock'] . $store['brand'] . $store['article'] . $store['days'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($action, $params = [], $method ='GET')
    {
        $url = $this->host . $action;

        $method == 'GET' ? $params['secret'] = $this->api_key : $url = $url . '?secret=' . $this->api_key ;

        $bodyType = $method == 'GET' ? 'query': 'body';
        $params = $bodyType == 'query' ? http_build_query($params) : json_encode($params);
        try {
            $result = $this->client->request($method, $url, [

                $bodyType => $params
                ]);
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
        $json = $response->getBody();

        $result = json_decode($json, true);

        if(is_null($result)) throw new \Exception('Not auth', 401);

        if(empty($result)) throw new \Exception('Not found', 404);
//
//        $methods = [
//            'Response' => 'getStatusCode',
//            'ClientException' => 'getCode'
//        ];
//
//        $class = class_basename($response);
//
//        $method = $methods[$class];
//
//        $errorCode = $response->$method();
//
//        foreach ($this->errors as $code => $info) {
//            if ($errorCode != $code) continue;
//            throw new \Exception($info['return'], $code);
//        }
//
//        $json = $response->getBody();
//
//        $result = json_decode($json, true);
//
//        if (isset($result['resources']) && empty($result['resources']))
//            throw new \Exception('Not found', 404);
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
//       $q = $this->query('/api/cart/list');
//       dd($q);

        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $params = [
                'id' => $orderInfo['model']['resource_id'],
                'warehouse' => $orderInfo['model']['code'],
                'quantity' => intval($product->count),
                'code' => $orderInfo['model']['product_code'],
            ];
//            $response = $this->query('/api/cart/add', $params, 'POST');//Добавление товара в корзину, дада дудосим по одному товару))))
        }

        $setting = $this->getSettings();
        $params = [];
        if($data['delivery_type_id'] == 1) {
            $params = [
                'method' => $data['delivery_type_id'],
                'payment' => $data['payment_type_id'],
                'pickup_point' => $data['pickup_address_id']
                ];
        } elseif ($data['delivery_type_id'] == 2) {
            $params = [
                'method' => $data['delivery_type_id'],
                'payment' => $data['payment_type_id'],
                'point' => $data['delivery_address_id']
            ];
            foreach ($setting['points'] as $point)
            {
                dd($point);
                if(array_search($data['delivery_address_id'],$point)) $params['address'] = $point['address'];
            }
        }

//        $this->query('/api/cart/order', $params, 'POST'); //Подтверждение заказа

        $this->createProviderOrder($data);

        return true;
    }

    public function getPickupAddresses(): array
    {
        $setting = $this->getSettings();

        if ($setting == []) return $setting;

        $setting = $setting['pickup_points'];

        $pickupAddress = [];

        foreach ($setting as  $address) {
            $pickupAddress[$address['code']] = $address['address'];
        }

        return $pickupAddress;    }

    public function getDeliveryToAddresses(): array
    {
        $setting = $this->getSettings();

        if ($setting == []) return $setting;

        $setting = $setting['points'];

        $deliveryAddress = [];

        foreach ($setting as  $address) {
            $deliveryAddress[$address['code']] = $address['address'];
        }

        return $deliveryAddress;
    }

    public function getPaymentTypes(): array
    {
        $setting = $this->getSettings();

        $setting = $setting['payment'];

        $payments = [];

        foreach ($setting as  $payment) {
            $payments[$payment['id']] = $payment['name'];
        }

        return $payments;
    }

    public function getDeliveryTypes(): array
    {
        $setting = $this->getSettings();

        $setting = $setting['methods'];

        $methods = [];

        foreach ($setting as  $method) {
            $methods[$method['id']] = $method['name'];
        }

        return $methods;
    }

    public function getDateOfShipment(): array
    {
        return [];
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

    protected function getSettings() : array
    {
        if(empty($this->settings)){
            $this->settings = $this->query('/api/cart/params');
        }
        return $this->settings;
    }
}





