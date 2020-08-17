<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InnController extends Controller
{
    public function getInfo(string $inn)
    {
        $url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

        $fields = [
            'query' => $inn,
            'count' => 1
        ];

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($handle, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Accept: application/json",
            "Authorization: Token 650d1fbb633516d9a2ed473832d4939c9e176640",
        ));
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_POSTFIELDS, json_encode($fields));

        $result = curl_exec($handle);

        curl_close($handle);

        $result = json_decode($result);

        $suggestion = collect($result->suggestions)->first();

        $response = [];

        if(isset($response->data)) {
            $response = [
                'opf' => [
                    'short' => $suggestion->data->opf->short,
                    'full' => $suggestion->data->opf->full
                ],
                'inn' => $suggestion->data->inn,
                'ogrn' => $suggestion->data->ogrn,
                'name' => $suggestion->data->name->full,
                'kpp' => $suggestion->data->kpp ?? null
            ];
        }

        return response()->json($response);
    }
}
