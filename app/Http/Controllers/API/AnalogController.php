<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnalogController extends Controller
{
    public static function getAnalogues($article, $m_id)
    {
        $attributes = [
            'n' => $article,
            'mfi' => $m_id,
        ];

        $response = self::makeRequest('analogList', $attributes);

        $mans_collect = collect($response->manufacturerList->mf);
        $parts_collect = collect($response->productList->p);
        $analog_collect = collect($response->analogList->a);

        $analogues = [];

        for ($i = 0; $i < count($analog_collect); $i++) {

            $analog = $analog_collect[$i];

            $manufacturer = $mans_collect->where('i', $analog->mfai)->first();
            $part = $parts_collect->where('i', $analog->pai)->first();

            $analogues[] = [
                'm_id' => $manufacturer->dbi,
                'm_name' => $manufacturer->da,
                'p_id' => $part->dbi,
                'p_name' => $part->d,
                'nsa' => $analog->nsa,
            ];
        }

        return $analogues;
    }

    public static function getManufacturersByArticle(string $article)
    {
        $response = self::makeRequest('productList', [ 'n' => $article ]);

        #Фильтр запроса

        $manufacturers = [];

        $mans_collect = collect($response->manufacturerList->mf);
        $parts_collect = collect($response->productList->p);

        for($i = 0; $i < count($parts_collect); $i++) {

            $part = $parts_collect[$i];
            $manufacturer = $mans_collect->where('i', $part->mfi)->first();

            $manufacturers[] = [
                'm_id' => $manufacturer->dbi,
                'm_name' => $manufacturer->da,
                'p_id' => $part->dbi,
                'p_name' => $part->d
            ];
        }

        return $manufacturers;
    }

    public static function makeRequest(string $method, array $params = [])
    {
        $url = 'https://fapi.iisis.ru/fapi/v2/' . $method . '?';

        $params['ui'] = '73fe9d3a-6b61-40f5-a44f-6d1e0183917a';

        $url .= http_build_query($params);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $headers = [
            'Content-Type: application/json;',
        ];

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);

        curl_close($ch);

        return json_decode($response);
    }
}
