<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use SoapClient;

class ForumAuto implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'https://api.forum-auto.ru/v2/';

    protected $name = 'Forum Auto';
    protected $service_key = 'forumauto';

    protected $login;
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

        $this->login = $this->company->getServiceFieldValue($this->service_key, 'login');
        $this->password = $this->company->getServiceFieldValue($this->service_key, 'password');
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'art' => $article,
            'cross' => 0
        ];

        $response = $this->query('listGoods', $params);

        return array_column($response, 'brand');
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
            'art' => $article,
            'br' => $brand,
            'cross' => 1
        ];

        $items = $this->query('listGoods', $params);

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if($items == []) return $results;

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

    protected function query($action, $params)
    {
        $url = $this->host . $action;

        $params['login'] = $this->login;
        $params['pass'] = $this->password;

        $url .= '?' . http_build_query($params);

        try {
            $result = file_get_contents($url);
            $result = json_decode($result, true);
        }
        catch (\Exception $exception) {
           $result = $exception;
        }
//        dd($result);

        if(isset($result['errors'])) return [];

        return $result;
    }

    private function errorHandler($response) : void
    {
        if(!empty($response['Message']) && strcasecmp($response['Message'],"Ошибка авторизации") == 0) {
            throw new \Exception('Not auth', 401);
        }

        if(empty($response['List'])) {
            throw new \Exception('Not found', 404);
        }
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
}
