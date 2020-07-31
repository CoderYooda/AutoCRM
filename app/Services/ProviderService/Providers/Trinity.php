<?php


namespace App\Services\ProviderService\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use stdClass;

class Trinity implements ProviderInterface
{
    protected $host = 'http://trinity-parts.ru/httpws/hs/';

    protected $name = 'Trinity';
    protected $service_id = 1;
    protected $field_id = 1;

    public function searchBrandsCount(string $article): array
    {
        $params = array(
            'searchCode' => $article,
            'online' => true ? 'allow' : 'disallow'
        );
        $url = $this->host . 'search/byCode';

        $results = $this->query($url, $this->createParams($params), true);

        return array_column($results['data'], 'producer');
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getServiceId(): int
    {
        return $this->service_id;
    }

    public function isActivated(): bool
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        return (bool)$company->isServiceProviderActive($this->service_id);
    }

    public function getStoresByArticleAndBrand(string $article, string $brand): array
    {
        $items = $this->searchItems($article, $brand, 'full', true);

        $results = [];

        foreach ($items['data'] as $store) {
            $results[] = [
                'name' => $store['stock'],
                'code' => $store['code'],
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

    protected function createParams(array $params = array())
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $data = new stdClass();
        $data->clientCode = $company->getServiceFieldValue($this->service_id, $this->field_id);
        foreach ($params as $name => $param) {
            $data->$name = $param;
        }
        return stream_context_create([
            'http' => [
                'header' => "Content-Type:application/json\r\n\User-Agent:Trinity/1.0",
                'method' => "POST",
                'content' => json_encode($data)
            ]
        ]);
    }

    protected function query($url, $context, $asArray = true)
    {
        $this->error = '';
        $data = @file_get_contents($url, false, $context);
        if (!$data) {
            $this->error = (!$error = error_get_last()) ? 'Ошибка при получении данных' : $error['message'];
            return array();
        }
        return json_decode($data, $asArray);
    }
}
