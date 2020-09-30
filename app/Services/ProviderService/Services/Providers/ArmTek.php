<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Models\Company;
use App\Rules\CheckApiDataForServices;
use App\Rules\CheckServiceFieldOnValid;
use App\Services\ProviderService\Contract\ProviderInterface;
use Carbon\Carbon;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use stdClass;

class ArmTek implements ProviderInterface
{
    protected $url = "http://ws.armtek.ru/api";

    protected $name = 'ArmTek';
    protected $service_key = 'armtek';

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
            'VKORG' => $this->company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'PIN' => $article,
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
            'VKORG' => $this->company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'BRAND' => $brand,
            'KUNNR_RG' => $this->getApiKunnr(),
            'PIN' => $article
        ];

        $items = $this->query('/ws_search/search', $params, 'POST');

        foreach ($items['RESP'] as $key => $item) {

            $items['RESP'][$key]['hash_info'] = [
                'stock' => $item['KEYZAK'],
                'manufacturer' => $item['BRAND'],
                'article' => $article,
                'days' => $item['DLVDT'],
                'price' => $item['PRICE']
            ];

        }

        $results = [];

        foreach ($items['RESP'] as $key => $item) {

            $delivery_timestamp = Carbon::parse($item['DLVDT']);

            $delivery_days = Carbon::now()->diffInDays($delivery_timestamp);

            $results[] = [
                'index' => $key,
                'name' => $item['KEYZAK'],
                'code' => $item['ARTID'],
                'delivery' => $delivery_days,
                'days_min' => $delivery_days,
                'price' => $item['PRICE'],
                'manufacturer' => $item['BRAND'],
                'stock' => $item['KEYZAK'],
                'model' => $item,
                'hash' => md5($item['KEYZAK'] . $item['BRAND'] . $article . $item['DLVDT'] . $item['PRICE'])
            ];
        }

        return $results;
    }

    public function getSelectFieldValues(string $field_name): array
    {
        $fields = [];

        if($field_name == 'sales_organization') {
            $result = $this->query('/ws_user/getUserVkorgList', [], 'GET');

            if(isset($result['RESP'])) {
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
                'method' => $method,
                'header' => 'Content-Type: application/json' . "\r\n"
                    . 'Authorization: Basic '. base64_encode($this->login . ":" . $this->password) . "\r\n",
                'content' => $params
            ],
        ]));

        $result = (array)json_decode($result, true);

        if(isset($result['MESSAGES'][0]['TYPE']) && $result['MESSAGES'][0]['TYPE'] == 'E') {
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
        if(!isset($fields['login']) || !isset($fields['password'])) return false;

        try {
            $result = file_get_contents($this->url . '/ws_user/getUserVkorgList?format=json', null, stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => 'Content-Type: application/json' . "\r\n"
                        . 'Authorization: Basic ' . base64_encode($fields['login'] . ":" . $fields['password']) . "\r\n",
                ],
            ]));
        }
        catch (\Exception $exception) {
            throw_error('ArmTek: Ошибка авторизации логина или пароля.');
        }

        $result = (array)json_decode($result);

        $vkorgs_list = array_column($result['RESP'], 'VKORG');

        if(!in_array($fields['sales_organization'], $vkorgs_list)) return false;

        return $result['STATUS'] == 200;
    }

    public function sendOrder(array $products): bool
    {
        // TODO: Implement sendOrder() method.
    }
}
