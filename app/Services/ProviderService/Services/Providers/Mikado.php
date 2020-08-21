<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Services\ProviderService\Contract\ProviderInterface;
use Illuminate\Support\Facades\Auth;

class Mikado implements ProviderInterface
{
    protected $host = 'https://mikado-parts.ru/';

    protected $name = 'Mikado';
    protected $service_key = 'mikado';

    /** @var Company */
    protected $company = null;

    protected $login = null;
    protected $password = null;

    public function __construct()
    {
        $this->company = Auth::user()->company;

        $this->login = $this->company->getServiceFieldValue($this->service_key, 'login');
        $this->password = $this->company->getServiceFieldValue($this->service_key, 'password');
    }

    public function searchBrandsCount(string $article): array
    {
        $params = [
            'Search_Code' => $article,
            'ClientID' => $this->login,
            'Password' => $this->password,
            'FromStockOnly' => 'FromStockAndByOrder'
        ];

        $result = $this->query('ws1/service.asmx/Code_Search', $params);

        $result = array_column($result['List']['Code_List_Row'], 'Brand');

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
            'Search_Code' => $article,
            'ClientID' => $this->login,
            'Password' => $this->password,
            'FromStockOnly' => 'FromStockAndByOrder'
        ];

        $items = $this->query('ws1/service.asmx/Code_Search', $params);

        $items = collect($items['List']['Code_List_Row']);

        $items = $items->where('Brand', $brand);

        $results = [];

        foreach ($items as $item) {

            $delivery_days = (int)preg_replace('/[^0-9]/', '', $item['Srock'] ?? '0');

            $results[] = [
                'name' => $item['Supplier'],
                'code' => $item['ZakazCode'],
                'days_min' => $delivery_days,
                'delivery' => $delivery_days,
                'price' => $item['PriceRUR'],
            ];
        }

        return $results;
    }

    private function query($path, $params): array
    {
        $handle = curl_init();

        curl_setopt($handle, CURLOPT_URL, $this->host . $path);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($handle, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
        curl_setopt($handle, CURLOPT_POSTFIELDS, http_build_query($params));
        $result = curl_exec($handle);

        $info = curl_getinfo($handle);

        curl_close($handle);

        if($info['http_code'] != 200) {
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
            'ZakazCode' => 'xka-k1279',
            'ClientID' => $this->login,
            'Password' => $this->password
        ];

        $result = $this->query('ws1/service.asmx/Code_Info', $params);

        if($result['CodeType'] == 'NotDefined') {
            throw_error('Mikado: Ошибка авторизации логина или пароля.');
        }

        return true;
    }
}
