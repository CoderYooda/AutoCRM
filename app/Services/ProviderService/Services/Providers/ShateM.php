<?php


namespace App\Services\ProviderService\Services\Providers;

use Carbon\Carbon;
use GuzzleHttp\Client;
use App\Models\Company;
use Illuminate\Support\Facades\Cache;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use stdClass;

class ShateM implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'https://api.shate-m.ru/';

    protected $name = 'Шате-М';
    protected $service_key = 'shate-m';

    /** @var Company */
    protected $company = null;

    protected $login;
    protected $password;
    protected $authKey;

    /** @var User $user */
    protected $user = null;

    protected $errors = [

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
        $this->authKey = $this->company->getServiceFieldValue($this->service_key, 'api_key');
    }

    public function searchBrandsCount(string $article): array
    {
        $url = "api/search/GetTradeMarksByArticleCode/{$article}";

        $response = $this->query($url, 'GET');

        $results = [];

        foreach ($response['TradeMarkByArticleCodeModels'] as $brand) {
            $results[] = [
                'brand' => $brand['TradeMarkName'],
                'article' => $article,
                'desc' => $brand['PartName'],
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

    protected function filterItems($items)
    {
        $filtered = [];

        foreach ($items as $key => $item) {

            $warehouses = $item['ArticlePriceInfo'];

            unset($item['ArticlePriceInfo']);

            foreach ($warehouses as $warehouse) {
                $filtered[] = array_merge($item, $warehouse);
            }
        }

        return $filtered;
    }

    public function getStoresByArticleAndBrand(string $article, string $brand): array
    {
        $items = $this->searchItems($article, $brand);

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if ($items == []) return $results;

        $originalIndex = 0;
        $analogueIndex = 0;

        $filtered = $this->filterItems($items);

        foreach ($filtered as $key => $item) {

            $filtered[$key]['index'] = $key;

            $filtered[$key]['hash_info'] = [
                'stock'        => $item['LocationCode'],
                'manufacturer' => $item['TradeMarkName'],
                'article'      => $item['ArticleCode'],
                'days'         => $item['DeliveryTerm'],
                'price'        => $item['Price'],
                'packing'      => $item['Multiplicity'] ?? 1,
                'desc'         => $item['Description'],
                'rest'         => (int)$item['Qty'],
                'supplier'     => $this->name,
            ];
        }

        foreach ($filtered as $key => $store) {

            $isAnalogue = $store['IsAnalog'];

            $listName = $isAnalogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index'        => $isAnalogue ? $analogueIndex : $originalIndex,
                'name'         => $store['Description'],
                'code'         => $store['OfferKey'],
                'rest'         => (int)$store['Qty'],
                'days_min'     => $store['DeliveryTerm'],
                'days_max'     => $store['DeliveryTerm'],
                'packing'      => $item['Multiplicity'] ?? 1,
                'min_count'    => 1,
                'delivery'     => $store['DeliveryTerm'] . ' дн.',
                'price'        => $store['Price'],
                'manufacturer' => $store['TradeMarkName'],
                'article'      => $store['ArticleCode'],
                'model'        => $store,
                'stock'        => $store['LocationCode'],
                'can_return'   => 'n/a',
                'hash'         => md5($store['LocationCode'] . $store['TradeMarkName'] . $store['ArticleCode'] . $store['DeliveryTerm'] . $store['Price']),
            ];

            $isAnalogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    public function searchItems($article, $brand)
    {
        $url = 'api/search/GetPricesByArticle';

        $params = [
            'ArticleCode' => $article,
            'TradeMarkName' => $brand,
//            'TradeMarkId' => ,
            'IncludeAnalogs' => true,
        ];

        $response = $this->query($url, 'GET', $params);

        return $response['PriceModels'];
    }

    protected function query($url, $method, $params = [])
    {
        $token = $this->getApiToken();

        try {

            $fullUrl = $this->host . $url;

            $client = new Client();

            $options = [
                'headers' => [
                    'Token' => $token,
                ]
            ];

            if($method == 'GET') $fullUrl .= '?' . http_build_query($params);

            $response = $client->request($method, $fullUrl, $options);

            $data = json_decode($response->getBody()->getContents(), true);

        } catch (Exception $exception) {
            $data = $exception;

            dd($exception);
        }

        $this->errorHandler($data);

        return $data;
    }

    protected function getApiToken()
    {
        $cacheKey = 'api_' . $this->service_key . $this->company->id;

        return Cache::remember($cacheKey, Carbon::now()->addMinutes(10), function () {
            $client = new Client();

            $headers = [
                'Authorization' => 'Basic ' . base64_encode($this->login . ':' . $this->password),
            ];

            $params = [
                'ApiKey' => $this->authKey,
            ];

            $options = [
                'headers' => $headers,
                'form_params' => $params,
            ];

            $url = $this->host . 'login';

            try {
                $response = $client->post($url, $options);
            }
            catch (Exception $exception) {
                throw new Exception('wrong data', 403);
            }

            return last($response->getHeaders()['Token']);
        });
    }

    private function errorHandler($response) : void
    {
//        if (is_object($response)) {
//
//            $errorMessage = $response->getMessage();
//
//            foreach ($this->errors as $code => $info) {
//                if (strpos($errorMessage, $info['search']) === false) continue;
//                throw new \Exception($info['return'], $code);
//            }
//        } else {
//
//            $errorMessage = $response;
//
//            foreach ($this->errors as $code => $info) {
//                if ($errorMessage['count'] == $info['search'] && empty($errorMessage['data']))
//                throw new \Exception($info['return'], $code);
//            }
//        }
    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if (!isset($fields['api_key'])) return false;
        if (!isset($fields['login'])) return false;
        if (!isset($fields['password'])) return false;

        $this->authKey = $fields['api_key'];
        $this->login = $fields['login'];
        $this->password = $fields['password'];

        //Если эксепшен не был выкинут, то пропускаем
        $this->searchBrandsCount('k1279');

        return true;
    }

    public function sendOrder(array $data): bool
    {
//        $orders = [];
//
//        foreach ($data['orders'] as $product) {
//
//            $orderInfo = json_decode($product->data, true);
//
//            $orders[] = [
//                'internal_id'   => $product->id,
//                'bid'           => $orderInfo['model']['bid'],
//                'code'          => $orderInfo['model']['code'],
//                'producer'      => $orderInfo['model']['producer'],
//                'caption'       => $orderInfo['model']['caption'],
//                'supplier_id'   => $orderInfo['model']['supplier_id'],
//                'stock'         => $orderInfo['model']['stock'],
//                'price'         => $orderInfo['model']['price'],
//                'saled_price'   => $orderInfo['model']['price'] + sum_percent($orderInfo['model']['price'], 20),
//                'quantity'      => $product->count,
//                'source'        => $orderInfo['model']['source'],
//                'comment'       => $data['comment'] ?? '',
//                'deliverydays'  => $orderInfo['model']['deliverydays'],
//                'minOrderCount' => $orderInfo['model']['minOrderCount'],
//            ];
//        }
//
//        $params = [
//            'parts' => $orders
//        ];
//
//        $results = $this->query('cart/saveGoods', $this->createParams($params), true);
//
//        $idList = collect($results['data'])->collapse()->toArray();
//
//        $params = [
//            'IDs' => $idList
//        ];
//
//        $results = $this->query('cart/confirm', $this->createParams($params), true);
//
//        $this->createProviderOrder($data);

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
        return [];
    }

    public function getDateOfShipment(): array
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

    public function getTimeOfShipment(): array
    {
        return [];
    }
}
