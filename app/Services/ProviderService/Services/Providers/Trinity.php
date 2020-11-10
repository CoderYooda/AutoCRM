<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use stdClass;

class Trinity implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://trinity-parts.ru/httpws/hs/';

    protected $name = 'Trinity';
    protected $service_key = 'trinity';
    protected $field_name = 'api_key';

    /** @var Company */
    protected $company = null;

    protected $api_key = null;

    /** @var User $user */
    protected $user = null;

    public function __construct()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $this->user = Auth::user();

        $this->company = $shop->company ?? $this->user->company;

        $this->api_key = $this->company->getServiceFieldValue($this->service_key, $this->field_name);
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'searchCode' => $article,
            'online' => true ? 'allow' : 'disallow'
        ];

        $results = $this->query('search/byCode', $this->createParams($params), true);

        return array_column($results['data'], 'producer');
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
        $items = $this->searchItems($article, $brand, 'full', true);

        $results = [];

        foreach ($items['data'] as $key => $item) {

            $items['data'][$key]['index'] = $key;

            $items['data'][$key]['hash_info'] = [
                'stock' => $item['stock'],
                'manufacturer' => $item['producer'],
                'article' => $article,
                'days' => $item['deliverydays'],
                'price' => $item['price'],
                'packing' => $item['minOrderCount'],
                'desc' => $item['caption'],
                'rest' => $item['rest'],
                'supplier' => $this->name
            ];
        }

        foreach ($items['data'] as $key => $store) {

            if(!strlen($store['bid'])) continue;

            preg_match_all('/\d+/', $store['deliverydays'], $days);

            $days_min = $days[0][0];
            $days_max = $days[0][1] ?? 9999;

            $results[] = [
                'index' => $key,
                'name' => $store['stock'],
                'code' => $store['code'],
                'rest' => $store['rest'],
                'days_min' => $days_min,
                'days_max' => $days_max,
                'min_count' => $store['minOrderCount'],
                'delivery' => $store['deliverydays'] . 'дн.',
                'price' => $store['price'],
                'manufacturer' => $store['producer'],
                'model' => $store,
                'stock' => $store['stock'],
                'hash' => md5($store['stock'] . $store['producer'] . $article . $store['deliverydays'] . $store['price'])
            ];
        }

        return $results;
    }

    public function searchItems($article, $brand, $searchType = 'full', $asArray = true) {
        $article = strtoupper($article);
        $brand = strtoupper($brand);
        $searchParams = new stdClass();
        $searchParams->$article = $brand;
        $params = [
            'searchCode' => $searchParams,
            'onlyStock' => '0',
        ];

        switch ($searchType) {
            case 'onlyStock':
                $params['onlyStock'] = '1';
                break;
            case 'prices':
                $params['online'] = 'disallow';
                $params['analogs'] = [];
                break;
            case 'full':
                $params['online'] = 'allow';
                break;
        }

        return $this->query('search/byCodeBrand', $this->createParams($params), $asArray);
    }

    protected function createParams(array $params = [])
    {
        $params['clientCode'] = $this->api_key;

        return stream_context_create([
            'http' => [
                'header' => "Content-Type:application/json\r\n\User-Agent:Trinity/1.0",
                'method' => "POST",
                'content' => json_encode($params)
            ]
        ]);
    }

    protected function query($url, $context, $asArray = true)
    {
        $data = null;

        try {
            $url .= (strpos($url, 'cart/saveGoods') !== false ? '?v=2' : '');

            $data = file_get_contents($this->host . $url, false, $context);
        }
        catch (\Exception $exception) {
            throw_error('Trinity: Ошибка авторизации ключа');
        }

        return json_decode($data, $asArray);
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
        $orders = [];

        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $orders[] = [
                'internal_id' => $product->id,
                'bid' => $orderInfo['bid'],
                'code' => $orderInfo['code'],
                'producer' => $orderInfo['producer'],
                'caption' => $orderInfo['caption'],
                'supplier_id' => $orderInfo['supplier_id'],
                'stock' => $orderInfo['stock'],
                'price' => $orderInfo['price'],
                'saled_price' => $orderInfo['price'] + sum_percent($orderInfo['price'], 20),
                'quantity' => $product->count,
                'source' => $orderInfo['source'],
                'comment' => $data['comment'] ?? '',
                'deliverydays' => $orderInfo['deliverydays'],
                'minOrderCount' => $orderInfo['minOrderCount'],
            ];
        }

        $params = [
            'parts' => $orders
        ];

        $results = $this->query('cart/saveGoods', $this->createParams($params), true);

        $idList = collect($results['data'])->collapse()->toArray();

        $params = [
            'IDs' => $idList
        ];

        $results = $this->query('cart/confirm', $this->createParams($params), true);

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
}
