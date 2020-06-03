<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleRequest;
use App\Models\Partner;
use App\Models\Vehicle;
use App\Models\VehicleMark;
use App\Models\VehicleModel;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function store(VehicleRequest $request)
    {
        $vehicle = Vehicle::updateOrCreate(['id' => $request->id], $request->except('id', '_token', 'refer'));

        return response()->json([
            'vehicle' => $vehicle,
            'message' => 'Транспорт был сохранён.',
            'html' => view(get_template() . '.partner.dialog.tabs.includes.list-item', compact('vehicle'))
                ->with('class', $request->refer)
                ->render()
        ], 200);
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return response()->json([
            'message' => 'Транспорт был успешно удалён.',
        ], 200);
    }

    public function list(VehicleMark $mark)
    {
        $marks = [];
        foreach ($mark->models as $model) {
            $marks[] = [
                'value' => $model->id,
                'label' => $model->name
            ];
        }
        return response()->json($marks);
    }

    public static function vehicleDialog(Request $request)
    {
        $vehicle = Vehicle::find($request->vehicle_id);

        $tag = 'vehicleDialog' . ($vehicle->id ?? '');

        $mark_id = $vehicle ? $vehicle->mark_id : VehicleMark::first()->id;

        $models = VehicleModel::where('mark_id', $mark_id)->get();

        $view = view(get_template() . '.vehicles.dialog.form_vehicle', compact('request', 'vehicle', 'tag', 'models'))
            ->with('marks', VehicleMark::all())
            ->render();

        $response = [
            'tag' => $tag,
            'html' => $view,
        ];

        return response()->json($response);
    }
}
