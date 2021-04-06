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

class Partkom implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'https://www.part-kom.ru/engine/api/v3/';

    protected $name = 'Партком';
    protected $service_key = 'partkom';

    protected $login;
    protected $password;

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

        $this->login = $this->company->getServiceFieldValue($this->service_key, 'login');
        $this->password = $this->company->getServiceFieldValue($this->service_key, 'password');

        $this->client = new Client();
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
             'number' => $article
        ];

        $response = $this->query('search/parts', $params);

        $results = [];

        foreach ($response as $item) {
            $results[] = [
                'brand' => $item['maker'],
                'article' => $item['number'],
                'desc' => $item['description']
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
        //Сначала необходимо получить ид производителя, (Требования спецификации API поставщика)
        $branId = $this->query('ref/brands');
        $branId = collect($branId)->where('name',$brand)->first()['id'];
        $params = [
            'number' => $article,
            'maker_id' => $branId,
            'find_substitutes' => true
        ];

        $items = $this->query('search/parts', $params);

//        $unfilteredItems = $response['resources'];

//        foreach ($unfilteredItems as $item) {
//            foreach ($item['offers'] as $offer) {
//                $items[] = [
//                    'resource_id' => $item['id'],
//                    'stock' => $offer['warehouse']['name'],
//                    'brand' => $item['brand']['name'],
//                    'article' => $item['article'],
//                    'days' => $offer['assured_period'],
//                    'price' => $offer['price'],
//                    'packing' => $offer['multiplication_factor'],
//                    'desc' => $item['name'],
//                    'rest' => $offer['quantity'],
//                    'supplier' => $this->name,
//                    'code' => $offer['warehouse']['id'],
//                    'days_min' => $offer['average_period'],
//                    'days_max' => $offer['assured_period'],
//                    'delivery_type' => $offer['delivery_type']
//                ];
//            }
//        }

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
                'stock' => $item['placement'],
                'manufacturer' => $item['maker'],
                'article' => $item['number'],
                'days' => $item['guaranteedDays'],
                'price' => $item['price'],
                'packing' => $item['minQuantity'] > 0 ? $item['minQuantity'] : 1,
                'desc' => $item['description'],
                'rest' => $item['quantity'],
                'supplier' => $this->name
            ];
        }

        foreach ($items as $store) {

            $is_analogue = $store['maker'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['description'],
                'code' => $store['placementId'],
                'rest' => $store['quantity'],
                'days_min' => $store['expectedDays'],
                'days_max' => $store['guaranteedDays'],
                'packing' => $store['minQuantity'] > 0 ? $store['minQuantity'] : 1,
                'min_count' => $store['minQuantity'] > 0 ? $store['minQuantity'] : 1,
                'delivery' => $store['guaranteedDays'] . ' дн.',
                'price' => $store['price'],
                'manufacturer' => $store['maker'],
                'article' => $store['number'],
                'model' => $store,
                'stock' => $store['placement'],
                'can_return' => $store['flagReturnImpossible'] ? 'Да' : 'Нет',
                'hash' => md5($store['placement'] . $store['maker'] . $store['number'] . $store['guaranteedDays'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($action, $params = [], $method ='GET')
    {
        $url = $this->host . $action;

        $bodyType = $method == 'GET' ? 'query': 'body';

        $credentials = base64_encode($this->login.':'.$this->password);

        try {
            $result = $this->client->request($method, $url, [

                $bodyType => $method == 'GET' ? http_build_query($params) : json_encode($params),
                'headers' => [
                    'Content-Type'=>'application/json',
                    'Accept' => 'application/json',
                    'Authorization' => 'Basic ' . $credentials,
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

        if($class == 'ClientException') {
            $json = $response->getResponse()->getBody(true);
        } else {
            $json = $response->getBody();
        }

        $result = json_decode($json, true);

        if (empty($result))
            throw new \Exception('Not found', 404);
    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if(!isset($fields['login']) && !isset($fields['password'])) return false;

        $this->login = $fields['login'];
        $this->password = $fields['password'];

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
                'detailNum' => $orderInfo['article'],
                'makerId' => $orderInfo['model']['makerId'],
                'description' => $orderInfo['name'],
                'price' => $orderInfo['price'],
                'providerId' => $orderInfo['model']['providerId'],
                'quantity' => $product->count,
                'comment' => $data['comment'],
            ];
        }

        $params = [
                'flag_test' => true,
                'returnOnSuccess' => true,
                'generateReference' => true,
                'orderItems' => $products
        ];

        $this->query('order', $params, 'POST'); //Подтверждение заказа

        $this->createProviderOrder($data);

        return true;
    }

    public function getPickupAddresses(): array
    {
        return [];
    }

    public function getDeliveryToAddresses(): array
    {
        return [];
    }

    public function getPaymentTypes(): array
    {
        return [];
    }

    public function getDeliveryTypes(): array
    {
        return [
            '2' => 'Самовывоз'
        ];
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
}





