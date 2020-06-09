<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleRequest;
use App\Models\Partner;
use App\Models\Vehicle;
use App\Models\VehicleMark;
use App\Models\VehicleModel;
use App\Models\VehicleModify;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function store(VehicleRequest $request)
    {
        $attributes = $request->except('id', '_token', 'refer');

//        if(isset($request['partner_id'])) {
//            $attributes['partner_id'] = $request['partner_id'];
//        }

        $vehicle = Vehicle::updateOrCreate(['id' => $request->id], $attributes);

        return response()->json([
            'vehicle' => $vehicle->load('mark','model','modify'),
            'message' => 'Транспорт был сохранён.',
            'event' => 'VehicleStored',
            'html' => view(get_template() . '.partner.dialog.tabs.includes.list-item', compact('vehicle'))
                ->with('class', $request->refer)
                ->render()
        ], 200);
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return response()->json([
            'vehicle' => $vehicle,
            'message' => 'Транспорт был успешно удалён.',
        ], 200);
    }

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

    public static function vehicleDialog(Request $request)
    {
        $vehicle = Vehicle::find($request->vehicle_id);

        $tag = 'vehicleDialog' . ($vehicle->id ?? '');

        $mark_id = $vehicle ? $vehicle->mark_id : null;
        $model_id = $vehicle ? $vehicle->model_id : null;
        $modify_id = $vehicle ? $vehicle->modify_id : null;

        $models = $mark_id ? VehicleModel::where('mark_id', $mark_id)->get() : [];
        $modifies = $models ? VehicleModify::where(['model_id' => $model_id])->get() : [];

        $default_vehicle = [
            'mark_id' => $mark_id,
            'model_id' => $model_id,
            'modify_id' =>$modify_id
        ];

        $view = view(get_template() . '.vehicles.dialog.form_vehicle', compact('request','vehicle', 'default_vehicle', 'tag', 'models', 'modifies'))
            ->with('marks', VehicleMark::all())
            ->with('partner', Partner::find($request->partner_id))
            ->render();

        $response = [
            'tag' => $tag,
            'html' => $view,
        ];

        return response()->json($response);
    }
}
