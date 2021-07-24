<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use App\Services\ShopManager\ShopManager;
use App\Traits\CartProviderOrderCreator;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use SoapClient;

class FourDot implements ProviderInterface
{
    use CartProviderOrderCreator;

    protected $host = 'http://api-b2b.4tochki.ru/WCF/ClientService.svc?wsdl';

    protected $name = 'Четыре точки';
    protected $service_key = 'fourdot';

    protected $login;
    protected $password;

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
            'text' => $article,
            'delivery_id' => '000000001'
        ];

        $response = $this->query('GetSearch', $params);

        $results = [
            'originals' => [],
            'analogues' => []
        ];


        $originalIndex = 0;
        $analogueIndex = 0;

        $unfilteredItems = $response['SearchResult']['PartsList']['Part'];

        $items = [];

        //Проверяем есть ли у товара аналоги, далее идет лютый говнокод, ПАМАГИТЕ!!!
        if (isset($unfilteredItems['crosses']['Part'])) {

            foreach ($unfilteredItems['crosses']['Part'] as $item_key => $item) {

                if (is_int($item_key)) {

                    foreach ($item['stocks']['stock'] as $offer_key => $offer) {

                        if (is_int($offer_key)) {

                            $items[] = $this->getInfoFromIndexArray($item, $offer);

                        } else {

                            $items[] = $this->getInfoFromAssociatedArray($item);
                            break;
                        }
                    }

                } else {

                    foreach ($unfilteredItems['crosses']['Part']['stocks']['stock'] as $offer_key => $offer) {

                        if (is_int($offer_key)) {

                            $items[] = $this->getInfoFromIndexArray($unfilteredItems['crosses']['Part'], $offer);

                        } else {

                            $items[] = $this->getInfoFromAssociatedArray($unfilteredItems['crosses']['Part']);
                            break;
                        }
                    }

                    break;
                }
            }
        }

        unset($unfilteredItems['crosses']);

        if (isset($unfilteredItems['stocks']['stock'])) {

            foreach ($unfilteredItems['stocks']['stock'] as $offer_key => $offer) {

                if (is_int($offer_key)) {

                    $items[] = $this->getInfoFromIndexArray($unfilteredItems, $offer);

                } else {

                    $items[] = $this->getInfoFromAssociatedArray($unfilteredItems);
                    break;
                }
            }
        }

        foreach ($items as $key => $item) {

            $items[$key]['index'] = $key;
            $items[$key]['hash_info'] = [
                'stock' => $item['stock_id'],
                'manufacturer' => $item['brand'],
                'article' => $item['partnumber'],
                'days' => $item['delivery'],
                'price' => $item['price'],
                'packing' => $item['multiplicity'] > 0 ? $item['multiplicity'] : 1,
                'desc' => $item['name'],
                'rest' => $item['count'],
                'supplier' => $this->name
            ];
        }

        foreach ($items as $store) {

            $is_analogue = $store['brand'] != $brand;


            $listName = $is_analogue ? 'analogues' : 'originals';

            $results[$listName][] = [
                'index' => $is_analogue ? $analogueIndex : $originalIndex,
                'name' => $store['name'],
                'code' => $store['guid'],
                'rest' => $store['count'] > 1 ? $store['count'] : 0,
                'days_min' => $store['delivery'],
                'days_max' => $store['delivery'],
                'packing' => $store['multiplicity'] > 0 ? $store['multiplicity'] : 1,
                'min_count' => $store['multiplicity'] > 0 ? $store['multiplicity'] : 1,
                'delivery' => $store['delivery'] . ' дн.',
                'price' => $store['price'],
                'manufacturer' => $store['brand'],
                'article' => $store['partnumber'],
                'model' => $store,
                'stock' => $store['stock_id'],
                'can_return' => 'n/a',
                'hash' => md5($store['stock_id'] . $store['brand'] . $store['partnumber'] . $store['delivery'] . $store['price'])
            ];

            $is_analogue ? $analogueIndex++ : $originalIndex++;
        }

        return $results;
    }

    protected function query($method, $fields = [])
    {
        $client = new SoapClient($this->host);

        $params = [
            'login' => $this->login,
            'password' => $this->password,
        ];

        $params = array_merge($params, $fields);

        $response = $client->$method($params);

        $result = object_to_array($response);

        $this->errorHandler($result);

        return $result;
    }

    private function errorHandler($response): void
    {

    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if (!isset($fields['login']) && !isset($fields['password'])) return false;

        $this->login = $fields['login'];
        $this->password = $fields['password'];

        //Если эксепшен не был выкинут, то пропускаем
        $this->searchBrandsCount('2329500');

        return true;
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'code_list' => [
                $article
            ],
        ];

        $response = $this->query('GetGoodsInfo', $params);

        $response = $response['SearchResult']['PartsList']['Part'];

        $results = [];

        if (isset($response['name'])) {
            $results[] = $this->getBrandInfoFromItem($response);
        } else {
            foreach ($response as $index => $item) {
                $results[] = $this->getBrandInfoFromItem($item);
            }
        }


        return $results;
    }

    private function getBrandInfoFromItem($item): array
    {
        return [
            'brand' => $item['brand'],
            'article' => $item['partnumber'],
            'desc' => strlen($item['name']) ? $item['name'] : 'Отсутствует',
            'searchArticle' => $item['guid']
        ];
    }

    private function getInfoFromIndexArray($item, $offer)
    {

        return [
            'guid' => $item['guid'],
            'brand' => $item['brand'],
            'partnumber' => $item['partnumber'],
            'name' => $item['name'],
            'stock_id' => $offer['id'],
            'price' => $offer['price'],
            'count' => $offer['count'],
            'multiplicity' => $offer['multiplicity'],
            'type' => $offer['type'],
            'delivery' => $offer['delivery'],
            'extra' => $offer['extra'],
            'description' => $offer['description'],
            'deliveryStart' => $offer['deliveryStart'],
            'deliveryEnd' => $offer['deliveryEnd']
        ];
    }

    private function getInfoFromAssociatedArray($item)
    {

        return [
            'guid' => $item['guid'],
            'brand' => $item['brand'],
            'partnumber' => $item['partnumber'],
            'name' => $item['name'],
            'stock_id' => $item['stocks']['stock']['id'],
            'price' => $item['stocks']['stock']['price'],
            'count' => $item['stocks']['stock']['count'],
            'multiplicity' => $item['stocks']['stock']['multiplicity'],
            'type' => $item['stocks']['stock']['type'],
            'delivery' => $item['stocks']['stock']['delivery'],
            'extra' => $item['stocks']['stock']['extra'],
            'description' => $item['stocks']['stock']['description'],
            'deliveryStart' => $item['stocks']['stock']['deliveryStart'],
            'deliveryEnd' => $item['stocks']['stock']['deliveryEnd']
        ];
    }

    public function sendOrder(array $data): bool
    {
        $params = [];

        $params['delivery'] = [
            'delivery_id' => $data['delivery_type_id'],
            'address_id' => $data['delivery_type_id'] == '000000002' ? $data['delivery_address_id'] : ' '
        ];
        $params['payment'] = [
            'payment_id' => $data['payment_type_id']
        ];

        $params['contact'] = [
            'name' => $this->user->partner->outputName(),
            'phone' => empty($this->user->partner->firstActivePhoneNumber()) ? $this->user->phone : $this->user->partner->firstActivePhoneNumber()
        ];
        $params['delivery_parts'] = false;

        foreach ($data['orders'] as $product) {

            $orderInfo = json_decode($product->data, true);

            $params['PARTS'][] = [
                'partnumber' => $orderInfo['article'],
                'brand' => $orderInfo['manufacturer'],
                'stock' => $orderInfo['model']['stock_id'],
                'count' => $product->count
            ];
        }

        $result = $this->query('GetCheckout', $params);

        $this->createProviderOrder($data);

        return true;
    }

    public function getPickupAddresses(): array
    {
        return [];
    }

    public function getDeliveryToAddresses(): array
    {
        $result = $this->query('GetCheckoutDetails');
        $result = $result['CheckoutDetailsResult']['DeliveryAddress'];

        if(isset($result['address']['id'])) {

            return [$result['address']['id'] => $result['address']['city'].' '.$result['address']['street']. ' '.$result['address']['house']];
        }

        $addresses = [];

        foreach ($result['address'] as $address) {

            $addresses[$address['id']] = $address['city'].' '.$address['street']. ' '.$address['house'];
        }

        return $addresses;
    }
// добавить позднее оплату банковской картой
    public function getPaymentTypes(): array
    {
        return [
            '2' => 'Оплата наличными при получении товара'
        ];
    }

    public function getDeliveryTypes(): array
    {
        $result = $this->query('GetCheckoutDetails');
        $result = $result['CheckoutDetailsResult']['DeliveryType'];

        $delivery_types = [];

        foreach ($result['delivery'] as $deliver) {

            $delivery_types[$deliver['id']] = $deliver['name'];
        }
        return $delivery_types;
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
