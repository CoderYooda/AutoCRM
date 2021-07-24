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

class AutoPiter implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://service.autopiter.ru/v2/price?WSDL';

    protected $name = 'Автопитер';
    protected $service_key = 'autopiter';

    protected $user_id;
    protected $password;

    /** @var Company */
    protected $company = null;

    /** @var User $user */
    protected $user = null;

    public function __construct()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $this->user = Auth::user();

        $this->company = $shop->company ?? $this->user->company;

        $this->user_id = $this->company->getServiceFieldValue($this->service_key, 'user_id');
        $this->password = $this->company->getServiceFieldValue($this->service_key, 'password');
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
            'ArticleId' => $article,
            'SearchCross' => 1
        ];

        $items = $this->query('GetPriceId', $params);

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if ($items == []) return $results;

        $originalIndex = 0;
        $analogueIndex = 0;

        $items = $items['GetPriceIdResult']['PriceSearchModel'];

        foreach ($items as $key => $item) {

            if(isset($item['NumberChange'])) continue;

            $items[$key]['index'] = $key;

            $items[$key]['hash_info'] = [
                'stock' => $item['Region'],
                'manufacturer' => $item['CatalogName'],
                'article' => $item['Number'],
                'days' => $item['NumberOfDaysSupply'],
                'price' => $item['SalePrice'],
                'packing' => $item['MinNumberOfSales'] > 0 ? $item['MinNumberOfSales'] : 1,
                'desc' => $item['Name'],
                'rest' => $item['NumberOfAvailable'] > 1 ? $item['NumberOfAvailable'] : 'n/a',
                'supplier' => $this->name
            ];
        }

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
        $url = $this->host;

        $client = new SoapClient($url);

        $response = $client->Authorization([
            "UserID" => $this->user_id,
            "Password" => $this->password,
            "Save" => false
        ]);

        if (!$response->AuthorizationResult) {
            throw new Exception('No auth', 401);
        }

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

            if (isset($response['FindCatalogResult']) && $response['FindCatalogResult'] == []) {

                throw new \Exception('Not found', 404);

            }

        }

//        if (is_object($response)) {
//
//            $errorMessage = $response->getMessage();
//
//            foreach ($this->errors as $code => $info) {
//                if (strpos($errorMessage, $info['search']) === false) continue;
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

        if (!isset($fields['user_id']) && !isset($fields['password'])) return false;

        $this->user_id = $fields['user_id'];
        $this->password = $fields['password'];

        //Если эксепшен не был выкинут, то пропускаем
        $this->searchBrandsCount('k1279');

        return true;
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'Number' => $article
        ];

        $response = $this->query('FindCatalog', $params);

        $results = [];

        $response = $response['FindCatalogResult']['SearchCatalogModel'];

        if (isset($response['CatalogName'])) {
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
            'brand' => $item['CatalogName'],
            'article' => $item['Number'],
            'desc' => strlen($item['Name']) ? $item['Name'] : 'Отсутствует',
            'searchArticle' => $item['ArticleId']
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
