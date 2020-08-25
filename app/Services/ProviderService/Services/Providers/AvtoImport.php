<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Support\Facades\Auth;

class AvtoImport implements ProviderInterface
{
    protected $host = 'http://id8341.public.api.abcp.ru/';

    protected $name = 'AvtoImport';
    protected $service_key = 'avtoimport';

    /** @var Company */
    protected $company = null;

    protected $login = null;
    protected $password = null;

    public function __construct()
    {
        /** @var Company company */
        $this->company = Auth::user()->company;

        $this->login = $this->company->getServiceFieldValue($this->service_key, 'login');
        $this->password = md5($this->company->getServiceFieldValue($this->service_key, 'password'));
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'number' => $article
        ];

        $result = $this->query('search/brands/', $params, 'GET');

        return array_column($result, 'brand');
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
            'number' => $article,
            'brand' => $brand,
            'useOnlineStocks' => 1
        ];

        $items = $this->query('search/articles/', $params, 'GET');

        $results = [];

        foreach ($items as $key => $item) {

            $min_days = $item->deliveryPeriod / 24;
            $max_days = $item->deliveryPeriodMax ?? 1 / 24;

            $results[] = [
                'index' => $key,
                'name' => $item->supplierCode,
                'code' => $item->number,
                'delivery' => $min_days . ($max_days > $min_days ?  ('/' . $max_days) : ''),
                'days_min' => $min_days,
                'days_max' => $max_days,
                'price' => $item->price,
                'model' => json_encode($item)
            ];
        }

        return $results;
    }

    private function query($path, $params, $method): array
    {
        $params['userlogin'] = $this->login;
        $params['userpsw'] = $this->password;
        $params['locale'] = 'ru_RU';

        $full_path = $this->host . $path . '?' . http_build_query($params);

        $result = file_get_contents($full_path, null, stream_context_create([
            'http' => [
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'method' => $method,
            ],
        ]));

        $result = (array)json_decode($result);

        if(array_key_exists('errorCode', $result) && $result['errorMessage'] != 'No results') {
            throw_error('AvtoImport: Ошибка авторизации логина или пароля.');
        }

        return $result;
    }

    public function getSelectFieldValues(string $field_name): array
    {
        return [];
    }

    public function checkConnect(array $fields): bool
    {
        if(!isset($fields['login']) || !isset($fields['password'])) return false;

        $this->login = $fields['login'];
        $this->password = md5($fields['password']);

        $this->searchBrandsCount('k1279');

        return true;
    }

    public function sendOrder(array $products): bool
    {
        $params = [

        ];

        $items = $this->query('basket/add/', $params, 'POST');
    }
}
