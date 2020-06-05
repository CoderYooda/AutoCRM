<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\VehicleMark;
use App\Models\VehicleModel;
use App\Models\VehicleModify;

class DecoderController extends Controller
{
    public static function getInfo(string $vin_code)
    {
        $key="K4yIFhkLdLpCBL1X3niXsveiblLAYPyL";

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://partsapi.ru/api.php?act=VINdecode&vin=' . $vin_code . '&lang=ru&key=' . $key,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => false,
        ));

        $response = curl_exec($curl);
        $response = json_decode($response, false);

        curl_close($curl);

        $mark_id = $response->markid;
        $model_id = $response->modelid;
        $modify_id = $response->modid;

        $mark = VehicleMark::find($mark_id);
        $model = VehicleModel::find($model_id);
        $modify = VehicleModify::find($modify_id);


    }
}
