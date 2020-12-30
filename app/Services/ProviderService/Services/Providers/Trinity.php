<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use stdClass;

class Trinity implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://trinity-parts.ru/httpws/hs/';

    protected $name = 'Trinity Parts';
    protected $service_key = 'trinity';
    protected $field_name = 'api_key';

    /** @var Company */
    protected $company = null;

    protected $api_key = null;

    /** @var User $user */
    protected $user = null;

    protected $errors = [
        401 => [
            'search' => '500',
            'return' => 'Not auth'
        ],
        404 => [
            'search' => 0,
            'return' => 'Not found'
        ],
    ];

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
            'online'     => true ? 'allow' : 'disallow'
        ];

        $response = $this->query('search/byCode', $this->createParams($params), true);

        $results = [];

        foreach ($response['data'] as $brand) {
            $results[] = [
                'brand' => $brand['producer'],
                'article' => $brand['article'],
                'desc' => strlen($brand['ident']) ? $brand['ident'] : 'Отсутствует'
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
        $items = $this->searchItems($article, $brand, 'full', true);

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if ($items == []) return $results;

        $originalIndex = 0;
        $analogueIndex = 0;

        foreach ($items['data'] as $key => $item) {

            $items['data'][$key]['index'] = $key;

            $items['data'][$key]['hash_info'] = [
                'stock'        => $item['stock'],
                'manufacturer' => $item['producer'],
                'article'      => $item['code'],
                'days'         => $item['deliverydays'],
                'price'        => $item['price'],
                'packing'      => $item['minOrderCount'],
                'desc'         => $item['caption'],
                'rest'         => $item['rest'],
                'supplier'     => $this->name
            ];
        }

        foreach ($items['data'] as $key => $store) {

            if (!strlen($store['bid'])) continue;

            $is_analogue = $store['producer'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            preg_match_all('/\d+/', $store['deliverydays'], $days);

            $days_min = $days[0][0];
            $days_max = $days[0][1] ?? 9999;

            $results[$listName][] = [
                'index'        => $is_analogue ? $analogueIndex : $originalIndex,
                'name'         => $store['caption'],
                'code'         => $store['code'],
                'rest'         => $store['rest'],
                'days_min'     => $days_min,
                'days_max'     => $days_max,
                'packing'      => $store['minOrderCount'],
                'min_count'    => $store['minOrderCount'],
                'delivery'     => $store['deliverydays'] . ' дн.',
                'price'        => $store['price'],
                'manufacturer' => $store['producer'],
                'article'      => $store['code'],
                'model'        => $store,
                'stock'        => $store['stock'],
                'can_return'   => 'n/a',
                'hash'         => md5($store['stock'] . $store['producer'] . $store['code'] . $store['deliverydays'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    public function searchItems($article, $brand, $searchType = 'full', $asArray = true)
    {
        $article = strtoupper($article);
        $brand = strtoupper($brand);
        $searchParams = new stdClass();
        $searchParams->$article = $brand;
        $params = [
            'searchCode' => $searchParams,
            'onlyStock'  => '0',
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
                'header'  => "Content-Type:application/json\r\n\User-Agent:Trinity/1.0",
                'method'  => "POST",
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
            $data = json_decode($data, $asArray);
        } catch (Exception $exception) {
            $data = $exception;
        }

        $this->errorHandler($data);

        return $data;
    }

    private function errorHandler($response) : void
    {
        if (is_object($response)) {

            $errorMessage = $response->getMessage();

            foreach ($this->errors as $code => $info) {
                if (strpos($errorMessage, $info['search']) === false) continue;
                throw new \Exception($info['return'], $code);
            }
        } else {

            $errorMessage = $response;

            foreach ($this->errors as $code => $info) {
                if ($errorMessage['count'] == $info['search'] && empty($errorMessage['data']))
                throw new \Exception($info['return'], $code);
            }
        }
    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if (!isset($fields['api_key'])) return false;

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
                'internal_id'   => $product->id,
                'bid'           => $orderInfo['model']['bid'],
                'code'          => $orderInfo['model']['code'],
                'producer'      => $orderInfo['model']['producer'],
                'caption'       => $orderInfo['model']['caption'],
                'supplier_id'   => $orderInfo['model']['supplier_id'],
                'stock'         => $orderInfo['model']['stock'],
                'price'         => $orderInfo['model']['price'],
                'saled_price'   => $orderInfo['model']['price'] + sum_percent($orderInfo['model']['price'], 20),
                'quantity'      => $product->count,
                'source'        => $orderInfo['model']['source'],
                'comment'       => $data['comment'] ?? '',
                'deliverydays'  => $orderInfo['model']['deliverydays'],
                'minOrderCount' => $orderInfo['model']['minOrderCount'],
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

    public function getSubdivisions(): array
    {
        return [];
    }

    public function getTimeOfShipment(): array
    {
        return [];
    }
}
