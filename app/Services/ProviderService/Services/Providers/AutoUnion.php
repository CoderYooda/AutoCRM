<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use stdClass;

class AutoUnion implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://xn----7sbgfs5baxh7jc.xn--p1ai/SearchService/';

    protected $name = 'АвтоСоюз-ЮГ';
    protected $service_key = 'autounion';
    protected $login = 'login';
    protected $password = 'password';

    /** @var Company */
    protected $company = null;

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
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'article' => $article,
            'withoutTransit' => 'true',
        ];

        $response = $this->query('GetBrands', 'GET', $params);

        $results = [];

        foreach ($response as $brand) {
            $results[] = [
                'brand' => $brand['Brand'],
                'article' => $brand['Article'],
                'desc' => $brand['Description']
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
            'withoutTransit' => 'true',
        ];

        $items = $this->query('GetParts', 'GET', $params);

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
                'stock'        => $item['SupplierName'],
                'manufacturer' => $item['Brand'],
                'article'      => $item['Article'],
                'days'         => $item['SupplierTimeMin'],
                'price'        => $item['CostSale'],
                'packing'      => $item['MinCount'],
                'desc'         => $item['Description'],
                'rest'         => $item['Count'],
                'supplier'     => $this->name
            ];
        }

        foreach ($items as $item) {

            $isAnalogue = $item['IsAnalog'];

            $listName = $isAnalogue ? 'analogues' : 'originals';

            $days_min = $item['SupplierTimeMin'];
            $days_max = $item['SupplierTimeMax'];

            $results[$listName][] = [
                'index'        => $isAnalogue ? $analogueIndex : $originalIndex,
                'name'         => $item['Description'],
                'code'         => $item['Article'],
                'rest'         => $item['Count'],
                'days_min'     => $days_min,
                'days_max'     => $days_max,
                'packing'      => $item['MinCount'],
                'min_count'    => $item['MinCount'],
                'delivery'     => $item['SupplierTimeMin'] . ' ч.',
                'price'        => $item['CostSale'],
                'manufacturer' => $item['Brand'],
                'article'      => $item['Article'],
                'model'        => $item,
                'stock'        => $item['SupplierName'],
                'can_return'   => $item['IsAllowDiscountRefund'] ? 'Да' : 'Нет',
                'hash'         => md5($item['SupplierName'] . $item['Brand'] . $item['Article'] . $item['SupplierTimeMin'] . $item['CostSale'])
            ];

            $isAnalogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($url, $method, $params = [])
    {
        try {
            $client = new Client();

            $fullUrl = $this->host . $url;

            $options = [
                'headers' => [
                    'Host' => 'xn----7sbgfs5baxh7jc.xn--p1ai',
                    'Authorization' => 'Basic ' . base64_encode("$this->login:$this->password"),
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ]
            ];

            if($method == 'POST') $options['body'] = json_encode($params);

            if($method == 'GET') $fullUrl .= '?' . http_build_query($params);

            $response = $client->request($method, $fullUrl, $options);

        } catch (Exception $exception) {
            throw $exception;
        }

        $this->errorHandler($response);

        return json_decode($response->getBody()->getContents(), true);
    }

    private function errorHandler($response) : void
    {

    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if (!isset($fields['login']) || !isset($fields['password'])) return false;

        $this->login = $fields['login'];
        $this->password = $fields['password'];

        //Если эксепшен не был выкинут, то пропускаем
        $this->searchBrandsCount('k1279');

        return true;
    }

    public function sendOrder(array $data): bool
    {
        $positions = [];

        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $positions[] = [
                'article' => $orderInfo['model']['Article'],
                'brand' => $orderInfo['model']['Brand'],
                'SupplierName' => $orderInfo['model']['SupplierName'],
                'CostSale' => $orderInfo['model']['CostSale'],
                'Quantity' => $product->count,
                'SupplierTimeMin' => $orderInfo['model']['SupplierTimeMin'],
                'SupplierTimeMax' => $orderInfo['model']['SupplierTimeMax'],
                'Comment' => $data['comment'] ?? '',
                'GioID' => (int)$product->id,
            ];
        }

        $params = [
            'items' => json_encode($positions),
        ];

        $results = $this->query('AddOrder', 'GET', $params);

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
