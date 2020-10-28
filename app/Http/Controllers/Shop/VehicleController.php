<?php

namespace App\Http\Controllers\Shop;

use App\Models\VehicleMark;
use App\Models\VehicleModel;
use App\Models\VehicleModify;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VehicleController extends Controller
{
    public function modelList(VehicleMark $mark)
    {
        $models = [];

        foreach ($mark->models as $model) {
            $models[] = [
                'value' => $model->id,
                'label' => $model->name
            ];
        }

        return response()->json($models);
    }

    public function modifyList(VehicleMark $mark, VehicleModel $model)
    {
        $modify_list = VehicleModify::where(['model_id' => $model->id])->get();

        $modifies = [];

        foreach ($modify_list as $modify) {
            $modifies[] = [
                'value' => $modify->id,
                'label' => $modify->name
            ];
        }

        return response()->json($modifies);
    }
}
