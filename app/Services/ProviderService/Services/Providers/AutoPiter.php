<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Cache;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use SoapClient;
use function Couchbase\defaultDecoder;

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
        dd($items);

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
                'stock' => $item['whse'],
                'manufacturer' => $item['brand'],
                'article' => $item['art'],
                'days' => $item['d_deliv'],
                'price' => $item['price'],
                'packing' => $item['kr'] > 0 ? $item['kr'] : 1,
                'desc' => $item['name'],
                'rest' => $item['num'],
                'supplier' => $this->name
            ];
        }

        foreach ($items as $store) {

            $is_analogue = $store['brand'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['name'],
                'code' => $store['art'],
                'rest' => $store['num'],
                'days_min' => $store['d_deliv'],
                'days_max' => $store['d_deliv'],
                'packing' => $item['kr'] > 0 ? $item['kr'] : 1,
                'min_count' => $item['kr'] > 0 ? $item['kr'] : 1,
                'delivery' => $store['d_deliv'] . ' дн.',
                'price' => $store['price'],
                'manufacturer' => $store['brand'],
                'article' => $store['art'],
                'model' => $store,
                'stock' => $store['whse'],
                'can_return' => $store['is_returnable'] ? 'Да' : 'Нет',
                'hash' => md5($store['whse'] . $store['brand'] . $store['art'] . $store['d_deliv'] . $store['price'])
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

            dd($response);
            $results[] = $response['CatalogName'];

            return $results;
        }

        foreach ($response as $index => $item) {

            $results[] = $item['CatalogName'];

        }

        return $results;
    }

    public function sendOrder(array $data): bool
    {
        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $params = [
                'tid' => $orderInfo['model']['gid'],
                'num' => $product->count,
            ];

            $this->query('addGoodsToOrder', $params);
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
