<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnalogController extends Controller
{
    protected $host = 'http://id34135.public.api.abcp.ru/';
    protected $login = 'api@id34135';
    protected $password = '3f4aa416a24a0bc475793cd6b63b2e33';

    public function getManufacturersByArticle(string $article)
    {
        $params = [
            'number' => $article,
            'useOnlineStocks' => 0
        ];

        $response = $this->query('search/brands/', $params, 'GET');

        $results = [];

        foreach ($response as $article) {
            $results[] = [
                'brand' => $article['brand'],
                'article' => $article['number'],
                'description' => $article['description']
            ];
        }

        return response()->json([
            'articles' => $results
        ]);
    }

    public function getAnalogues($brand, $article)
    {
        $params = [
            'brand'  => $brand,
            'number' => $article,
            'format' => 'bnpchmt',
            'cross_image' => 0
        ];

        $response = $this->query('articles/info/', $params, 'GET');

//        dd($response);

        if(!isset($response['crosses'])) return [];

        $results = [];

        foreach ($response['crosses'] as $article) {
           $results[$article['brand']][] = $article['numberFix'];
        }

        return $results;
    }

    private function query($path, $params, $method): array
    {
        $params['userlogin'] = $this->login;
        $params['userpsw'] = $this->password;
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
            $result = (array)json_decode($result, true);
        } catch (\Exception $exception) {

        }

        return $result;
    }
}
