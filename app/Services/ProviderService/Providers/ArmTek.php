<?php


namespace App\Services\ProviderService\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use stdClass;

class ArmTek implements ProviderInterface
{
    protected $url = "http://ws.armtek.ru/api";

    //http://ws.armtek.ru/api/ws_user/getUserVkorgList?format=json
    //http://ws.armtek.ru/api/ws_search/assortment_search?format=json

    protected $name = 'ArmTek';
    protected $service_key = 'armtek';

    public function searchBrandsCount(string $article): array
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $params = [
            'method' => 'GET',
            'path' => 'search/brands/',
            'userlogin' => $company->getServiceFieldValue($this->service_key, 2),
            'userpsw' => md5($company->getServiceFieldValue($this->service_key, 3)),
            'number' => $article,
            'locale' => 'ru_RU'
        ];

        $result = $this->query($params);

        return array_column($result, 'brand');
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getServiceId(): int
    {
        return $this->service_key;
    }

    public function isActivated(): bool
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        return (bool)$company->isServiceProviderActive($this->service_key);
    }

    public function getStoresByArticleAndBrand(string $article, string $brand): array
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $params = [
            'method' => 'GET',
            'path' => 'search/articles/',
            'userlogin' => $company->getServiceFieldValue($this->service_key, 2),
            'userpsw' => md5($company->getServiceFieldValue($this->service_key, 3)),
            'number' => $article,
            'brand' => $brand,
            'useOnlineStocks' => 1,
            'locale' => 'ru_RU'
        ];

        $items = $this->query($params);

        $results = [];

        foreach ($items as $item) {

            $min_days = $item->deliveryPeriod / 24;
            $max_days = $item->deliveryPeriodMax ?? 1 / 24;

            $results[] = [
                'name' => $item->supplierCode,
                'code' => $item->number,
                'delivery' => $min_days . ($max_days > $min_days ?  ('/' . $max_days) : ''),
                'price' => $item->price,
            ];
        }

        return $results;
    }

    public function getFields()
    {
        $fields = [];

        $results = $this->query('/ws_user/getUserVkorgList', [], 'GET');

        return $fields;
    }

    private function query($path, $params, $method): array
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $user = $company->getServiceFieldValue($this->service_key, 16);
        $password = $company->getServiceFieldValue($this->service_key, 17);

        $params = json_encode($params);

         $result = file_get_contents($this->url . $path . '?format=json', null, stream_context_create(array(
            'http' => array(
                'method' => $method,
                'header' => 'Content-Type: application/json' . "\r\n"
                    . 'Authorization: Basic '. base64_encode($user . ":" . $password) . "\r\n",
                'content' => $params
            ),
        )));

        $result = (array)json_decode($result);

        return $result;
    }
}
