<?php


namespace App\Services\ProviderService\Providers;

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

        foreach ($items['data'] as $store) {

            preg_match_all('/\d+/', $store['deliverydays'], $days)[0];

            $days_min = $days[0];
            $days_max = $days[1] ?? 9999;

            $results[] = [
                'name' => $store['stock'],
                'code' => $store['code'],
                'days_min' => $days_min,
                'days_max' => $days_max,
                'delivery' => $store['deliverydays'],
                'price' => $store['price'],
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

        $this->searchBrandsCount('k1279');

        return true;
    }
}
