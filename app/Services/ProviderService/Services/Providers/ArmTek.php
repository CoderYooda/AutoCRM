<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;

class ArmTek implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $url = "http://ws.armtek.ru/api";

    protected $name = 'ArmTek';
    protected $service_key = 'armtek';

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
            'VKORG' => $this->company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'PIN'   => $article,
        ];

        $result = $this->query('/ws_search/assortment_search', $params, 'POST');

        return array_column($result['RESP'], 'BRAND');
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
            'VKORG'      => $this->company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'BRAND'      => $brand,
            'KUNNR_RG'   => $this->getApiKunnr(),
            'PIN'        => $article,
            'QUERY_TYPE' => 2
        ];

        $items = $this->query('/ws_search/search', $params, 'POST');

        $results = [
            'originals' => [],
            'analogues' => []
        ];

        if (isset($items['RESP']['MSG'])) return $results;

        foreach ($items['RESP'] as $key => $item) {

            $items['RESP'][$key]['index'] = $key;

            $items['RESP'][$key]['hash_info'] = [
                'stock'        => $item['KEYZAK'],
                'manufacturer' => $item['BRAND'],
                'article'      => $item['PIN'],
                'days'         => $item['DLVDT'],
                'price'        => $item['PRICE'],
                'packing'      => $item['RDPRF'],
                'desc'         => $item['NAME'],
                'rest'         => $item['RVALUE'],
                'supplier'     => $this->name
            ];

        }

        $originalIndex = 0;
        $analogueIndex = 0;

        foreach ($items['RESP'] as $key => $item) {

            $is_analogue = $item['ANALOG'] == 'X';

            $listName = $is_analogue ? 'analogues' : 'originals';

            $delivery_timestamp = Carbon::parse($item['DLVDT']);

            $delivery_days = Carbon::now()->diffInDays($delivery_timestamp);

            $results[$listName][] = [
                'index'        => $is_analogue ? $analogueIndex : $originalIndex,
                'name'         => $item['NAME'],
                'code'         => $item['ARTID'],
                'rest'         => $item['RVALUE'],
                'delivery'     => $delivery_days . ' дн.',
                'days_min'     => $delivery_days,
                'price'        => $item['PRICE'],
                'packing'      => $item['RDPRF'],
                'manufacturer' => $item['BRAND'],
                'article'      => $item['PIN'],
                'stock'        => $item['KEYZAK'],
                'model'        => $item,
                'can_return'   => $item['RETDAYS'] ? 'Есть' : 'Нет',
                'hash'         => md5($item['KEYZAK'] . $item['BRAND'] . $item['PIN'] . $item['DLVDT'] . $item['PRICE'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    public function getSelectFieldValues(string $field_name): array
    {
        $fields = [];

        if ($field_name == 'sales_organization') {
            $result = $this->query('/ws_user/getUserVkorgList', [], 'GET');

            if (isset($result['RESP'])) {
                foreach ($result['RESP'] as $program) {

                    $fields[$program['PROGRAM_NAME']] = $program['VKORG'];
                }
            }
        }

        return $fields;
    }

    private function query($path, $params, $method): array
    {
        $params = json_encode($params);

        $result = @file_get_contents($this->url . $path . '?format=json', null, stream_context_create([
            'http' => [
                'method'  => $method,
                'header'  => 'Content-Type: application/json' . "\r\n"
                    . 'Authorization: Basic ' . base64_encode($this->login . ":" . $this->password) . "\r\n",
                'content' => $params
            ],
        ]));

        $result = (array)json_decode($result, true);

        if (isset($result['MESSAGES'][0]['TYPE']) && $result['MESSAGES'][0]['TYPE'] == 'E') {
            throw_error($result['MESSAGES'][0]['TEXT']);
        }

        return $result;
    }

    private function getApiKunnr()
    {
        $params = [
            'VKORG' => $this->company->getServiceFieldValue($this->service_key, 'sales_organization')
        ];

        $result = $this->query('/ws_user/getUserInfo', $params, 'POST');

        return $result['RESP']['STRUCTURE']['RG_TAB'][0]['KUNNR'];
    }

    public function checkConnect(array $fields): bool
    {
        if (!isset($fields['login']) || !isset($fields['password'])) return false;

        try {
            $result = file_get_contents($this->url . '/ws_user/getUserVkorgList?format=json', null, stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => 'Content-Type: application/json' . "\r\n"
                        . 'Authorization: Basic ' . base64_encode($fields['login'] . ":" . $fields['password']) . "\r\n",
                ],
            ]));
        } catch (Exception $exception) {
            throw_error('ArmTek: Ошибка авторизации логина или пароля.');
        }

        $result = (array)json_decode($result);

        $vkorgs_list = array_column($result['RESP'], 'VKORG');

        if (!in_array($fields['sales_organization'], $vkorgs_list)) return false;

        return $result['STATUS'] == 200;
    }

    public function sendOrder(array $data): bool
    {
        $orders = [];

        foreach ($data['orders'] as $order) {
            $orderInfo = json_decode($order->data, true);

            $orders[] = [
                'PIN'    => $orderInfo['PIN'],
                'BRAND'  => $orderInfo['BRAND'],
                'KWMENG' => $order->count,
//                'KEYZAK' => $orderInfo['KEYZAK'],
//                'DBTYP' => 3,
            ];
        }

        $params = [
            'VKORG'     => $this->company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'KUNRG'     => $this->getApiKunnr(),
            'INCOTERMS' => $data['delivery_type_id'],
            'KUNZA'     => $data['delivery_type_id'] == 1 ? $data['pickup_address_id'] : ['delivery_address_id'],
            'TEXT_ORD'  => $data['comment'],
            'ITEMS'     => $orders
        ];

        $items = $this->query('/ws_order/createOrder', $params, 'POST');

        $this->createProviderOrder($data);

        return true;
    }

    // Получение списка офисов самовывоза
    public function getPickupAddresses(): array
    {
        $params = [
            'VKORG'     => $this->company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'STRUCTURE' => 1
        ];

        $result = $this->query('/ws_user/getUserInfo', $params, 'POST');

        $pickups = $result['RESP']['STRUCTURE']['RG_TAB'][0]['EXW_TAB'];

        $results = [];

        foreach ($pickups as $pickup) {
            $results[$pickup['ID']] = $pickup['NAME'];
        }

        return $results;
    }

    //	Получение списка адресов доставки
    public function getDeliveryToAddresses(): array
    {
        $params = [
            'VKORG'     => $this->company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'STRUCTURE' => 1
        ];

        $result = $this->query('/ws_user/getUserInfo', $params, 'POST');

        $addresses = $result['RESP']['STRUCTURE']['RG_TAB'][0]['ZA_TAB'];

        $results = [];

        foreach ($addresses as $address) {
            $results[$address['KUNNR']] = $address['ADRESS'];
        }

        return $results;
    }

    public function getPaymentTypes(): array
    {
        return [];
    }

    //	Получение списка способов доставки
    public function getDeliveryTypes(): array
    {
        return [
            '1' => 'Самовывоз',
            '0' => 'Доставка'
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
