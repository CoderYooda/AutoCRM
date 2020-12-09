<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\CartInterface;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Illuminate\Support\Facades\Auth;

class Mikado implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'https://mikado-parts.ru/';

    protected $name = 'Mikado';
    protected $service_key = 'mikado';

    /** @var Company */
    protected $company = null;

    protected $login = null;
    protected $password = null;

    public function __construct()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $this->company = $shop->company ?? Auth::user()->company;

        $this->login = $this->company->getServiceFieldValue($this->service_key, 'login');
        $this->password = $this->company->getServiceFieldValue($this->service_key, 'password');
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'Search_Code'   => $article,
            'FromStockOnly' => 'FromStockAndByOrder'
        ];

        $result = $this->query('ws1/service.asmx/Code_Search', $params);

        $result = array_column($result['List']['Code_List_Row'] ?? [], 'Brand');

        $result = array_unique($result);

        $result = array_values($result);

        return $result;
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
            'Search_Code'   => $article,
            'FromStockOnly' => 'FromStockOnly'
        ];

        $items = $this->query('ws1/service.asmx/Code_Search', $params);

        $items = collect($items['List']['Code_List_Row'] ?? []);

        $brand = strtoupper($brand);

        $items = $items->filter(function ($item) use ($brand) {
            return strpos($item['Brand'], $brand) !== false;
        });

        $items = $items->toArray();

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        $originalIndex = 0;
        $analogueIndex = 0;

        foreach ($items as $key => $item) {

            $rest = null;
            $delivery = null;

            if (isset($item['OnStocks']['StockLine'][0]['DeliveryDelay'])) {
                $delivery = $item['OnStocks']['StockLine'][0]['DeliveryDelay'] . ' дн.';
                $rest = $item['OnStocks']['StockLine'][0]['StockQTY'];
            } else {
                $delivery = $item['OnStocks']['StockLine']['DeliveryDelay'] . ' дн.';
                $rest = $item['OnStocks']['StockLine']['StockQTY'];
            }

            $rest = (int)preg_replace('/[^0-9]/', '', $rest);
            $delivery = (int)preg_replace('/[^0-9]/', '', $delivery);

            $is_analogue = $item['CodeType'] == 'Analog';

            $listName = $is_analogue ? 'analogues' : 'originals';

            $items[$key]['index'] = $key;

            $items[$key]['hash_info'] = [
                'stock'        => $item['ZakazCode'],
                'manufacturer' => $item['ProducerBrand'],
                'article'      => $item['ProducerCode'],
                'days'         => $delivery,
                'price'        => $item['PriceRUR'],
                'packing'      => $item['MinZakazQTY'] ?? 1,
                'desc'         => $item['Name'],
                'rest'         => $rest,
                'supplier'     => $this->name
            ];

            $results[$listName][] = [
                'index'        => $is_analogue ? $analogueIndex : $originalIndex,
                'name'         => $item['Supplier'],
                'code'         => $item['ZakazCode'],
                'rest'         => $rest,
                'delivery'     => $delivery . ' дн.',
                'days_min'     => $delivery,
                'packing'      => $item['MinZakazQTY'] ?? 1,
                'price'        => $item['PriceRUR'],
                'manufacturer' => $item['ProducerBrand'],
                'article'      => $item['ProducerCode'],
                'stock'        => $item['ZakazCode'],
                'model'        => $items[$key],
                'can_return'   => 'n/a',
                'hash'         => md5($item['ZakazCode'] . $item['ProducerBrand'] . $item['ProducerCode'] . $delivery . $item['PriceRUR'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    private function query($path, $params): array
    {
        $handle = curl_init();

        $add_params = [
            'ClientID' => $this->login,
            'Password' => $this->password
        ];

        $params = array_merge($params, $add_params);

        curl_setopt($handle, CURLOPT_URL, $this->host . $path);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($handle, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
        curl_setopt($handle, CURLOPT_POSTFIELDS, http_build_query($params));
        $result = curl_exec($handle);

        $info = curl_getinfo($handle);

        curl_close($handle);

        if ($info['http_code'] != 200) {
            throw_error('Ошибка авторизации.');
        }

        $result = simplexml_load_string($result);

        $result = json_encode($result);
        $result = (array)json_decode($result, true);

        return $result;
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

        $params = [
            'ZakazCode' => 'xka-k1279'
        ];

        $result = $this->query('ws1/service.asmx/Code_Info', $params);

        if ($result['CodeType'] == 'NotDefined') {
            throw_error('Mikado: Ошибка авторизации логина или пароля.');
        }

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

    public function sendOrder(array $data): bool
    {
        $orders = [];

        foreach ($data['orders'] as $order) {

            $orderInfo = json_decode($order->data, true);

            $params = [
                'ZakazCode'    => $orderInfo['ZakazCode'],
                'QTY'          => $order->count,
                'DeliveryType' => 1,
                'Notes'        => $data['comment'] ?? '',
                'ExpressID'    => 0,
                'StockID'      => 0
            ];

            $orders[] = $params;

            $response = $this->query('ws1/basket.asmx/Basket_Add', $params);
        }

        /** @var CartInterface $cart */
        $cart = app(CartInterface::class);
        $cart->clearByProviderKey($this->service_key);

        $this->createProviderOrder($data);

        return true;
    }

    public function getOrdersStatuses(): array
    {
        return [];
    }
}
