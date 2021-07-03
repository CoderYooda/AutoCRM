<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\CartInterface;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Illuminate\Support\Facades\Auth;

class AutoTrade implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'https://api2.autotrade.su/?json';

    protected $name = 'АвтоТрейд';
    protected $service_key = 'autotrade';

    /** @var Company */
    protected $company = null;

    protected $login = null;
    protected $password = null;
    protected $salt = '1>6)/MI~{J';

    public function __construct ()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $this->company = $shop->company ?? Auth::user()->company;

        $this->login = $this->company->getServiceFieldValue($this->service_key, 'login');
        $this->password = $this->company->getServiceFieldValue($this->service_key, 'password');
    }

    public function searchBrandsCount (string $article): array
    {
        $params = [
            'q'      => $article,
            'strict' => 0,
            'cross'  => 1,
        ];

        $response = $this->query('getItemsByQuery', $params);

        $items = $response['items'];

        $results = [];

        foreach ($items as $item) {

            $results[] = [
                'brand'   => $item['brand_name'],
                'article' => $item['article'],
                'desc'    => $item['name']
            ];
        }

        return $results;
    }

    public function getName (): string
    {
        return $this->name;
    }

    public function getServiceKey (): string
    {
        return $this->service_key;
    }

    public function isActivated (): bool
    {
        return (bool)$this->company->isServiceProviderActive($this->service_key);
    }

    protected function implodeItemWarehouses ($items)
    {
        $result = [];

        foreach ($items as $item) {

            $stocks = $item['stocks'];

            unset($item['stocks']);

            foreach ($stocks as $stock) {

                $additional = [];

                foreach ($stock as $key => $value) {
                    $additional['stock_' . $key] = $value;
                }

                $result[] = array_merge($item, $additional);
            }
        }

        return $result;
    }

    public function getStoresByArticleAndBrand (string $article, string $brand): array
    {
        $params = [
            'storages'     => [0],
            'items'        => [
                $article => [
                    $brand => 1,
                ],
            ],
            'withDelivery' => 1,
        ];

        $response = $this->query('getStocksAndPrices', $params);

        $items = $this->implodeItemWarehouses($response['items']);

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        $originalIndex = 0;
        $analogueIndex = 0;

        foreach ($items as $key => $item) {

            $is_analogue = $item['itemtype'] != 'original';

            $listName = $is_analogue ? 'analogues' : 'originals';

            $items[$key]['index'] = $key;

            $rest = $item['stock_quantity_unpacked'];

            if(!$rest || $item['price'] == null) continue;

            $items[$key]['hash_info'] = [
                'stock'        => $item['stock_legend'],
                'manufacturer' => $item['brand'],
                'article'      => $item['article'],
                'days'         => $item['stock_delivery_period'],
                'price'        => $item['price'],
                'packing'      => 1,
                'desc'         => $item['name'],
                'rest'         => $rest,
                'supplier'     => $this->name
            ];

            $results[$listName][] = [
                'index'        => $is_analogue ? $analogueIndex : $originalIndex,
                'name'         => $item['name'],
                'code'         => $item['id'],
                'rest'         => $rest,
                'delivery'     => $item['stock_delivery_period'] . ' дн.',
                'days_min'     => $item['stock_delivery_period'],
                'packing'      => 1,
                'price'        => $item['price'],
                'manufacturer' => $item['brand'],
                'article'      => $item['article'],
                'stock'        => $item['stock_legend'],
                'model'        => $items[$key],
                'can_return'   => 'n/a',
                'hash'         => md5($item['stock_legend'] . $item['brand'] . $item['article'] . $item['stock_delivery_period'] . $item['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    private function query ($path, $fields = []): array
    {
        $params = [
            'auth_key' => md5($this->login . md5($this->password) . $this->salt),
            'method'   => $path,
            'params'   => $fields
        ];

        $request = 'data=' . json_encode($params);

        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->host);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded; charset=UTF-8']);
            $html = curl_exec($ch);
            curl_close($ch);
            $result = json_decode($html, true);
        }
        catch (\Exception $exception) {
            abort(403, 'Поставщику не предоставлен доступ по IP.');
        }

        $this->errorHandler($result);

        return $result;
    }

    private function errorHandler ($response): void
    {
        abort_if($response['code'] != 0, 403, $response['message']);
    }

    public function getSelectFieldValues (string $field_name): array
    {
        return [];
    }

    public function checkConnect (array $fields): bool
    {
        if (!isset($fields['login']) || !isset($fields['password'])) return false;

        $this->login = $fields['login'];
        $this->password = $fields['password'];

        $this->searchBrandsCount('k1279');

        return true;
    }

    public function getPickupAddresses (): array
    {
        return [];
    }

    public function getDeliveryToAddresses (): array
    {
        return [];
    }

    public function getPaymentTypes (): array
    {
        return [];
    }

    public function getDeliveryTypes (): array
    {
        return [
            '1' => 'Самовывоз',
            '3' => 'Доставка',
        ];
    }

    public function getDateOfShipment (): array
    {
        return [];
    }

    private function getContractId()
    {
        $response = $this->query('getBalance');

        return str_replace('#', '_', $response['firmdefault']);
    }

    public function sendOrder (array $data): bool
    {
        $this->query('clearBasket');

        $params = [
            'from_basket' => 2,
            'comment' => $data['comment'],
            'payment_type' => 'with_balance',
            'contract_id' => $this->getContractId(),
            'items' => [],
            'address_delivery' => 'Указан в личном кабинете.',
        ];

        foreach ($data['orders'] as $order) {

            $orderInfo = json_decode($order->data, true);

            $position = [
                'article'           => $orderInfo['model']['article'],
                'brand'             => $orderInfo['model']['brand'],
                'quantity_unpacked' => $order->count, //для доставки
                'amount' => $order->count, //для самовывоза
                'id_group_stocks'   => $orderInfo['model']['stock_id'],
                'type_receipt_item' => 3,
            ];

            $params['items'][] = $position;
        }

        $method = $data['delivery_type_id'] == 1 ?  'createDocRealization' : 'createDocUnconfirmedOrder';

        $response = $this->query($method, $params);

        /** @var CartInterface $cart */
        $cart = app(CartInterface::class);
        $cart->clearByProviderKey($this->service_key);

        $this->createProviderOrder($data);

        return true;
    }

    public function getOrdersStatuses (): array
    {
        return [];
    }

    public function getSubdivisions (): array
    {
        return [];
    }

    public function getTimeOfShipment (): array
    {
        return [];
    }
}
