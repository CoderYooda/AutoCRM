<?php


namespace App\Services\ProviderService\Providers;

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

    //http://ws.armtek.ru/api/ws_user/getUserVkorgList?format=json
    //http://ws.armtek.ru/api/ws_search/assortment_search?format=json

    protected $name = 'ArmTek';
    protected $service_key = 'armtek';

    public function searchBrandsCount(string $article): array
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $params = [
            'VKORG' => $company->getServiceFieldValue($this->service_key, 'sales_organization'),
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
        /** @var Company $company */
        $company = Auth::user()->company;

        return (bool)$company->isServiceProviderActive($this->service_key);
    }

    public function getStoresByArticleAndBrand(string $article, string $brand): array
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $params = [
            'VKORG' => $company->getServiceFieldValue($this->service_key, 'sales_organization'),
            'BRAND' => $brand,
            'KUNNR_RG' => $this->getApiKunnr(),
            'PIN' => $article
        ];

        $items = $this->query('/ws_search/search', $params, 'POST');

        $results = [];

        foreach ($items['RESP'] as $item) {

            $delivery_timestamp = Carbon::parse($item->DLVDT);

            $results[] = [
                'name' => $item->RVALUE,
                'code' => $item->ARTID,
                'delivery' => Carbon::now()->diffInDays($delivery_timestamp),
                'price' => $item->PRICE,
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
                    $fields[$program->PROGRAM_NAME] = $program->VKORG;
                }
            }
        }

        return $fields;
    }

    private function query($path, $params, $method): array
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $user = $company->getServiceFieldValue($this->service_key, 'login');
        $password = $company->getServiceFieldValue($this->service_key, 'password');

        $params = json_encode($params);

        $result = @file_get_contents($this->url . $path . '?format=json', null, stream_context_create(array(
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

    private function getApiKunnr()
    {
        /** @var Company $company */
        $company = Auth::user()->company;

        $params = [
            'VKORG' => $company->getServiceFieldValue($this->service_key, 'sales_organization')
        ];

        $result = $this->query('/ws_user/getUserInfo', $params, 'POST');

        return $result['RESP']->STRUCTURE->RG_TAB[0]->KUNNR;
    }

    public function checkConnect(array $fields): bool
    {
        if(!isset($fields['login']) || !isset($fields['password'])) return false;

        $result = @file_get_contents($this->url . '/ws_user/getUserVkorgList?format=json', null, stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => 'Content-Type: application/json' . "\r\n"
                    . 'Authorization: Basic '. base64_encode($fields['login'] . ":" . $fields['password']) . "\r\n",
            ],
        ]));

        if($result == []) return false;

        $result = (array)json_decode($result);

        $vkorgs_list = array_column($result['RESP'], 'VKORG');

        if(!in_array($fields['sales_organization'], $vkorgs_list)) return false;

        return $result['STATUS'] == 200;
    }
}
