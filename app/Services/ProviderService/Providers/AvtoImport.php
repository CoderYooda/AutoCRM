<?php


namespace App\Services\ProviderService\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Support\Facades\Auth;

class AvtoImport implements ProviderInterface
{
    protected $host = 'https://online.bbcrm.ru/test?';

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
            'method' => 'GET',
            'path' => 'search/brands/',
            'userlogin' => $this->login,
            'userpsw' => $this->password,
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
            'method' => 'GET',
            'path' => 'search/articles/',
            'userlogin' => $this->login,
            'userpsw' => $this->password,
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

        $result = (array)json_decode($result);

        if(array_key_exists('errorCode', $result) && $result['errorMessage'] != 'No results') {
            throw_error('AvtoImport: Ошибка авторизации логина или пароля.');
        }

        curl_close($handle);

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
}
