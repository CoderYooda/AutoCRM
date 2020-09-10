<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use stdClass;

class Trinity implements ProviderInterface
{
    protected $host = 'http://trinity-parts.ru/httpws/hs/';

    protected $name = 'Trinity';
    protected $service_key = 'trinity';
    protected $field_name = 'api_key';

    /** @var Company */
    protected $company = null;

    protected $api_key = null;

    public function __construct()
    {
        $this->company = Auth::user()->company;

        $this->api_key = $this->company->getServiceFieldValue($this->service_key, $this->field_name);
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'searchCode' => $article,
            'online' => true ? 'allow' : 'disallow'
        ];

        $url = $this->host . 'search/byCode';

        $results = $this->query($url, $this->createParams($params), true);

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
                'price' => $item['price']
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
                'days_min' => $days_min,
                'days_max' => $days_max,
                'delivery' => $store['deliverydays'],
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
        $url = $this->host . 'search/byCodeBrand';
        return $this->query($url, $this->createParams($params), $asArray);
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
        try {

            $url .= (strpos($url, 'cart/saveGoods') !== false ? '?v=2' : '');

            $data = file_get_contents($url, false, $context);
        }
        catch (\Exception $exception) {
            throw_error('Trinity: Ошибка авторизации ключа.');
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

    public function sendOrder(array $products): bool
    {
        foreach ($products as $product) {

            $emptyClass = new stdClass();
            $emptyClass->internal_id = $product->id;
            $emptyClass->bid = $product->delivery_key;
            $emptyClass->code = $product->article;
            $emptyClass->producer = $product->manufacturer;
//            $emptyClass->caption = 'Фильтр масляный';
//            $emptyClass->supplier_id = 'УТ0002790';
            $emptyClass->stock = $product->stock;
            $emptyClass->price = $product->price;
            $emptyClass->saled_price = $product->price + sum_percent($product->price, 20);
            $emptyClass->quantity = $product->count;
            $emptyClass->comment = 'тестовый заказ через API';
//            $emptyClass->deliverydays = '0/2';
            $emptyClass->minOrderCount = '1';

            $orders[] = $emptyClass;
        }

        $params = [
            'parts' => $orders
        ];

        $url = $this->host . 'cart/saveGoods';

        $results = $this->query($url, $this->createParams($params), true);

        //----------------------------------------------------------------------------------------------

        $idList = collect($results['data'])->collapse()->toArray();

        $params = [
            'IDs' => $idList
        ];

        $url = $this->host . 'cart/confirm';

        $results = $this->query($url, $this->createParams($params), true);

        dd($results);

        return true;
    }
}