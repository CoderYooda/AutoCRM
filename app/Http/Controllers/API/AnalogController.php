<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnalogController extends Controller
{
    protected $host = 'http://id8341.public.api.abcp.ru/';
    protected $login = 'avtodrive31@yandex.ru';
    protected $password = '15081984';

    public function getManufacturersByArticle(string $article)
    {
        $params = [
            'number' => $article,
            'useOnlineStocks' => 0
        ];

        $response = $this->query('search/brands/', $params, 'GET');

        $results = [];

        foreach ($response as $product) {
            $results[] = [
                'brand' => $product['brand'],
                'article' => $product['number'],
                'description' => $product['description']
            ];
        }

        return response()->json([
            'products' => $results
        ]);
    }

    public function getAnalogues($brand, $article)
    {
        $params = [
            'number'          => $article,
            'brand'           => $brand,
            'useOnlineStocks' => 1,
            'withOutAnalogs'  => 0
        ];

        $response = $this->query('search/articles/', $params, 'GET');

        $results = [];

        foreach ($response as $product) {
            if($product['brand'] == $brand) continue;
           $results[$product['brand']][] = $product['numberFix'];
        }

        return $results;
    }

    private function query($path, $params, $method): array
    {
        $params['userlogin'] = $this->login;
        $params['userpsw'] = md5($this->password);
        $params['locale'] = 'ru_RU';

        $full_path = $this->host . $path;

        if ($method == 'GET') $full_path .= ('?' . http_build_query($params));

        $context = [
            'http' => [
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'method' => $method
            ],
        ];

        if ($method == 'POST') {
            $context['http']['content'] = http_build_query($params);
        }

        $result = [];

        try {
            $result = file_get_contents($full_path, null, stream_context_create($context));
            $result = json_decode($result, true);
        } catch (\Exception $exception) {
//            dd($exception);
        }

        if (array_key_exists('errorCode', $result) && $result['errorMessage'] != 'No results') {
            throw_error('AvtoImport: Ошибка авторизации логина или пароля.');
        }

        return $result;
    }
}
