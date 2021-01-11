<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BikController extends Controller
{
    public static function getInfo(string $bik)
    {
        return response()->json(self::makeRequest($bik));
    }

    public static function makeRequest(string $bik)
    {
        $url = 'https://bik-info.ru/api.html?type=json&bik=' . $bik;

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
