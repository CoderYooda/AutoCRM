<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use stdClass;

class AutoEuro implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'https://api.autoeuro.ru/api/v-1.0/shop/';

    protected $name = 'Auto Euro';
    protected $service_key = 'autoeuro';
    protected $field_name = 'api_key';

    /** @var Company */
    protected $company = null;

    protected $api_key = null;

    /** @var User $user */
    protected $user = null;

    protected $errors = [
        401 => [
            'search' => 'Unauthorized',
            'return' => 'Not auth'
        ],
        404 => [
            'search' => 'Bad Request',
            'return' => 'Not Found'
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
            'code' => $article
        ];

        $response = $this->query('stock_items', $params);

        $brands = array_column($response['DATA']['CODES'], 'maker');

        $brands = array_unique($brands);

        return $brands;
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
            'code' => $article,
            'brand' => $brand,
            'with_crosses' => 1
        ];

        $response = $this->query('stock_items', $params);

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if($response == []) return $results;

        $items = $response['DATA']['CODES'];

        $items = array_merge($items, $response['DATA']['CROSSES']);

        if($items == []) return $results;

        $originalIndex = 0;
        $analogueIndex = 0;

        foreach ($items as $key => $item) {

            $items[$key]['index'] = $key;

            $items[$key]['hash_info'] = [
                'stock' => $item['from_warehouse_id'],
                'manufacturer' => $item['maker'],
                'article' => $item['code'],
                'days' => $item['order_time'],
                'price' => $item['price'],
                'packing' => $item['packing'] > 0 ? $item['packing'] : 1,
                'desc' => $item['name'],
                'rest' => $item['amount'],
                'supplier' => $this->name
            ];
        }

        foreach ($items as $store) {

            $is_analogue = $store['maker'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            if(strlen($store['order_time']) > 8) {
                $days_min = 0;
                $days_max = 0;
            }
            else {
                $days = explode('-', $store['order_time']);

                $days_min = $days[0];
                $days_max = $days[1];
            }

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['from_warehouse_id'],
                'code' => $store['code'],
                'rest' => $store['amount'],
                'days_min' => $days_min,
                'days_max' => $days_max,
                'packing' => $item['packing'] > 0 ? $item['packing'] : 1,
                'min_count' => $item['packing'] > 0 ? $item['packing'] : 1,
                'delivery' => $days_min . '-' . $days_max . ' дн.',
                'price' => $store['price'],
                'manufacturer' => $store['maker'],
                'article' => $store['code'],
                'model' => $store,
                'stock' => $store['from_warehouse_id'],
                'can_return' => 'n/a',
                'hash' => md5($store['from_warehouse_id'] . $store['maker'] . $store['code'] . $store['order_time'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($action, $params = [], $method = 'GET')
    {
        $url = $this->host . $action . '/json/' . $this->api_key;

        $params = http_build_query($params);

        try {

            $context = null;

            if($method == 'POST') {
                $opts = [
                    'http' => [
                        'method' => 'POST',
                        'header' => 'Content-Type: application/x-www-form-urlencoded',
                        'content' => $params
                    ]
                ];

                $context = stream_context_create($opts);
            }
            else {
                $url .= '?' . $params;
            }

            $response = file_get_contents($url, false, $context);
            $response = json_decode($response, true);
        }
        catch (\Exception $exception) {
            $response = $exception;
        }

        $this->errorHandler($response);

        return $response;
    }

    private function errorHandler($response) : void
    {
        if (is_object($response)) {

            $errorMessage = $response->getMessage();

            foreach ($this->errors as $code => $info) {
                if (strpos($errorMessage, $info['search']) === false) continue;
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
                'order_key' => $orderInfo['model']['order_key'],
                'quantity' => $product->count
            ];
        }

        $params = [
            'delivery_key' => $data[$data['delivery_type_id'] == 0 ? 'pickup_address_id' : 'delivery_address_id'],
            'subdivision_key' => $data['subdivision_id'],
            'wait_all_goods' => 1,
            'comment' => $data['comment'] ?? '',
            'stock_items' => json_encode($orders)
        ];

        $response = $this->query('order_stock', $params, 'POST');

        $this->createProviderOrder($data);

        return true;
    }

    public function getPickupAddresses(): array
    {
        $response = $this->query('deliveries');

        $pickups = collect($response['DATA']);

        $pickups = $pickups->where('delivery_method', 'Точка выдачи');

        $formattedArray = [];

        foreach ($pickups as $pickup) {
            $formattedArray[$pickup['delivery_key']] = $pickup['delivery_name'];
        }

        return $formattedArray;
    }

    public function getDeliveryToAddresses(): array
    {
        $response = $this->query('deliveries');

        $pickups = collect($response['DATA']);

        $pickups = $pickups->where('delivery_method', 'Доставка');

        $formattedArray = [];

        foreach ($pickups as $pickup) {
            $formattedArray[$pickup['delivery_key']] = $pickup['delivery_name'];
        }

        return $formattedArray;
    }

    public function getPaymentTypes(): array
    {
        return [];
    }

    public function getDeliveryTypes(): array
    {
        return [
            'Самовывоз',
            'Доставка'
        ];
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
        $response = $this->query('subdivisions');

        $subdivisions = collect($response['DATA']);

        $formattedArray = [];

        foreach ($subdivisions as $subdivision) {
            $formattedArray[$subdivision['subdivision_key']] = $subdivision['subdivision_name'];
        }

        return $formattedArray;
    }
}
