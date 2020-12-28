<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;

class MskRechie implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://portal.moskvorechie.ru/portal.api';

    protected $name = 'Москворечье';
    protected $service_key = 'mskrechie';

    protected $username;
    protected $api_key;

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

        $this->username = $this->company->getServiceFieldValue($this->service_key, 'username');
        $this->api_key = $this->company->getServiceFieldValue($this->service_key, 'api_key');
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'nr' => $article
        ];

        $response = $this->query('brand_by_nr', $params);

        return array_column($response['result'], 'brand');
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
            'nr' => $article,
            'f' => $brand,
            'v' => 1,
            'alt' => 1
        ];

        $response = $this->query('price_by_nr_firm', $params);
        $items = $response['result'];

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
                'stock' => $item['sname'],
                'manufacturer' => $item['brand'],
                'article' => $item['nr'],
                'days' => $item['ddays'],
                'price' => $item['price'],
                'packing' => $item['minq'] > 0 ? $item['minq'] : 1,
                'desc' => $item['name'],
                'rest' => $item['stock'],
                'supplier' => $this->name
            ];
        }


        foreach ($items as $store) {

            $is_analogue = $store['brand'] != $brand;

            $listName = $is_analogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['name'],
                'code' => $store['gid'],
                'rest' => $store['stock'],
                'days_min' => $store['ddays'],
                'days_max' => $store['ddays'],
                'packing' => $store['minq'] > 0 ? $store['minq'] : 1,
                'min_count' => $store['minq'] > 0 ? $store['minq'] : 1,
                'delivery' => $store['ddays'] . ' дн.',
                'price' => $store['price'],
                'manufacturer' => $store['brand'],
                'article' => $store['nr'],
                'model' => $store,
                'stock' => $store['sname'],
                'can_return' => $store['sflag'][1] == 0 ? 'Да' : 'Нет',
                'hash' => md5($store['sname'] . $store['brand'] . $store['nr'] . $store['ddays'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($action, $params = [])
    {
        $url = $this->host;

        $params['act'] = $action;
        $params['l'] = $this->username;
        $params['p'] = $this->api_key;
        $params['cs'] = 'utf8';


        $url .= '?' . http_build_query($params);
        try {
            $result = file_get_contents($url);
            $result = json_decode($result, true);
        } catch (\Exception $exception) {
            $result = $exception;
        }

        $this->errorHandler($result);

        return $result;
    }

    private function errorHandler($response) : void
    {
        if(isset($response['result']['status'])) {
            if($response['result']['status'] == '1') {
                throw new \Exception('Not auth', 401);
            }
        }

        if(empty($response['result'])) {
            throw new \Exception('Not found', 404);
        }

    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if(!isset($fields['api_key'])) return false;
        if(!isset($fields['username'])) return false;

        $this->api_key = $fields['api_key'];
        $this->username = $fields['username'];

        //Если эксепшен не был выкинут, то пропускаем

        $this->searchBrandsCount('k1279');

        return true;

    }

    public function sendOrder(array $data): bool
    {
        $this->query('clean_basket'); //Очистка корзины
        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $params = [
                'gid' => $orderInfo['model']['gid'],
                'q' => $product->count,
                'c' => $data['comment'] ?? ''
            ];

            $this->query('to_basket', $params);
        }

        $params = [
            'dl' => $data['delivery_type_id']
        ];

        $this->query('make_order_v2', $params); //Подтверждение заказа

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
            '0' => 'Самовывоз',
            '1' => 'Доставка',
            '2' => 'Зарезервировать'
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
        return [];
    }

    public function getTimeOfShipment(): array
    {
        return [];
    }
}
