<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use SoapClient;

class Rossko implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://api.rossko.ru/service/v2.1/';

    protected $name = 'Росско';
    protected $service_key = 'rossko';

    protected $api_key1;
    protected $api_key2;

    /** @var Company */
    protected $company = null;

    /** @var User $user */
    protected $user = null;

    protected $errors = [
        401 => [
            'error' => 'Неверный KEY1 и/или KEY2',
            'return' => 'Not auth'
        ],
        404 => [
            'error' => 'Ничего не найдено',
            'return' => 'Not found'
        ]
    ];

    public function __construct()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $this->user = Auth::user();

        $this->company = $shop->company ?? $this->user->company;

        $this->api_key1 = $this->company->getServiceFieldValue($this->service_key, 'api_key1');
        $this->api_key2 = $this->company->getServiceFieldValue($this->service_key, 'api_key2');
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
            'text' => $article ,
            'delivery_id' => '000000001'
        ];

        $response = $this->query('GetSearch', $params);

        $results = [
            'originals' => [],
            'analogues' => []
        ];


        $originalIndex = 0;
        $analogueIndex = 0;

        $unfilteredItems = $response['SearchResult']['PartsList']['Part'];

        $items = [];


        dd($unfilteredItems);

        //Проверяем есть ли у товара аналоги, далее идет лютый говнокод, ПАМАГИТЕ!!!
        if(isset($unfilteredItems['crosses']['Part'])) {

            foreach ($unfilteredItems['crosses']['Part'] as $key => $item) {

                    foreach ($item['stocks']['stock'] as $key1 => $offer) {

                        $items[] = [
                            'guid' => $item['guid'],
                            'brand' => $item['brand'],
                            'partnumber' => $item['partnumber'],
                            'name' => $item['name'],
                            'stock_id' => $offer['id'],
                            'price' => $offer['price'],
                            'count' => $offer['count'],
                            'multiplicity' => $offer['multiplicity'],
                            'type' => $offer['type'],
                            'delivery' => $offer['delivery'],
                            'extra' => $offer['extra'],
                            'description' => $offer['description'],
                            'deliveryStart' => $offer['deliveryStart'],
                            'deliveryEnd' => $offer['deliveryEnd']
                        ];
                    }


            }
        }

        $items[] = [
            'guid' => $item['guid'],
            'brand' => $item['brand'],
            'partnumber' => $item['partnumber'],
            'name' => $item['name'],
            'stock_id' => $offer['id'],
            'price' => $offer['price'],
            'count' => $offer['count'],
            'multiplicity' => $offer['multiplicity'],
            'type' => $offer['type'],
            'delivery' => $offer['delivery'],
            'extra' => $offer['extra'],
            'description' => $offer['description'],
            'deliveryStart' => $offer['deliveryStart'],
            'deliveryEnd' => $offer['deliveryEnd']
        ];

//        unset($unfilteredItems['crosses']);

        dd($unfilteredItems, $items);


        foreach ($items as $store) {

            $is_analogue = $store['CatalogName'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['Name'],
                'code' => $store['DetailUid'],
                'rest' => $store['NumberOfAvailable'] > 1 ? $store['NumberOfAvailable'] : 0,
                'days_min' => $store['NumberOfDaysSupply'],
                'days_max' => $store['NumberOfDaysSupply'],
                'packing' => $store['MinNumberOfSales'] > 0 ? $store['MinNumberOfSales'] : 1,
                'min_count' => $store['MinNumberOfSales'] > 0 ? $store['MinNumberOfSales'] : 1,
                'delivery' => $store['NumberOfDaysSupply'] . ' дн.',
                'price' => $store['SalePrice'],
                'manufacturer' => $store['CatalogName'],
                'article' => $store['Number'],
                'model' => $store,
                'stock' => $store['Region'],
                'can_return' => ($store['TypeRefusal'] != 3 && $store['TypeRefusal'] != 4) ? 'Да' : 'Нет',
                'hash' => md5($store['Region'] . $store['CatalogName'] . $store['Number'] . $store['NumberOfDaysSupply'] . $store['SalePrice'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($method, $params = [])
    {

        $url = $this->host . $method;

        $client = new SoapClient($url);

        $params['KEY1'] = $this->api_key1;
        $params['KEY2'] = $this->api_key2;


        try {
            $response = $client->$method($params);
            $result = object_to_array($response);

        } catch (Exception $exception) {
            $result = $exception;
        }

        $this->errorHandler($result);

        return $result;
    }

    private function errorHandler($response) : void
    {
        if (is_array($response)) {

            if (isset($response['SearchResult']['success']) && $response['SearchResult']['success'] == false) {

                $response = $response['SearchResult']['message'];

                foreach ($this->errors as $code => $info) {
                    if (strtolower($info['error']) != strtolower($response)) continue;
                    throw new \Exception($info['return'], $code);
                }

            }

        }
    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if (!isset($fields['api_key1']) && !isset($fields['api_key2'])) return false;

        $this->api_key1 = $fields['api_key1'];
        $this->api_key2 = $fields['api_key2'];

        //Если эксепшен не был выкинут, то пропускаем
        $this->searchBrandsCount('k1279');

        return true;
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'text' => $article,
            'delivery_id' => '000000001'
        ];

        $response = $this->query('GetSearch', $params);

        $response = $response['SearchResult']['PartsList']['Part'];

        $results = [];

        if (isset($response['name'])) {
            $results[] = $this->getBrandInfoFromItem($response);
        }
        else {
            foreach ($response as $index => $item) {
                $results[] = $this->getBrandInfoFromItem($item);
            }
        }

        return $results;
    }

    private function getBrandInfoFromItem ($item): array
    {
        return [
            'brand' => $item['brand'],
            'article' => $item['partnumber'],
            'desc' => strlen($item['name']) ? $item['name'] : 'Отсутствует',
            'searchArticle' => $item['guid']
        ];
    }

    public function sendOrder(array $data): bool
    {
        $params =[];

        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);
            $params['Items']['ItemAddCartModel'][] = [
                'DetailUid' => $orderInfo['code'],
                'SalePrice' => $orderInfo['price'],
                'Quantity' => $product->count
            ];
        }


        $result = $this->query('MakeOrderByItems', $params);
        dd($result);
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
