<?php


namespace App\Services\ProviderService\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use stdClass;

class AvtoImport implements ProviderInterface
{
    protected $host = 'https://online.bbcrm.ru/test?';

    protected $name = 'AvtoImport';
    protected $service_id = 2;

    public function searchBrandsCount(string $article): array
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $params = [
            'method' => 'GET',
            'path' => 'search/brands/',
            'userlogin' => $company->getServiceFieldValue($this->service_id, 2),
            'userpsw' => md5($company->getServiceFieldValue($this->service_id, 3)),
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
        /** @var Company $company */
        $company = Auth::user()->company;

        $params = [
            'method' => 'GET',
            'path' => 'search/articles/',
            'userlogin' => $company->getServiceFieldValue($this->service_id, 2),
            'userpsw' => md5($company->getServiceFieldValue($this->service_id, 3)),
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

    private function query($params): array
    {
        $query_params = http_build_query($params);

        $handle = curl_init();

        curl_setopt($handle, CURLOPT_URL, $this->host . $query_params);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($handle);

        dd($result);

        $result = (array)json_decode($result);

        curl_close($handle);

        return $result;
    }
}
