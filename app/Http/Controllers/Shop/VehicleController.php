<?php

namespace App\Http\Controllers\Shop;

use App\Http\Requests\Shop\DestroyVehicleRequest;
use App\Http\Requests\Shop\StoreVehicleRequest;
use App\Http\Requests\Shop\UpdateVehicleRequest;
use App\Models\Vehicle;
use App\Models\VehicleMark;
use App\Models\VehicleModel;
use App\Models\VehicleModify;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class VehicleController extends Controller
{
    public function edit(Vehicle $vehicle)
    {
        $marks = VehicleMark::all();
        $models = VehicleModel::where('mark_id', $vehicle->mark->id)->get();
        $modifications = VehicleModify::where('model_id', $vehicle->model->id)->get();

        $view = view('shop.modal.edit_vehicle', compact('vehicle', 'marks', 'models', 'modifications'));

        return response()->json([
            'html' => $view->render()
        ]);
    }

    public function update(Vehicle $vehicle, UpdateVehicleRequest $request)
    {
        $partner = Auth::user()->companyPartner;

        $vehicle->update($request->validated());

        $view = view('shop.layout.garage_slider')
            ->with('vehicles', $partner->vehicles);

        return response()->json([
            'type' => 'success',
            'message' => 'Транспорт успешно обновлён',
            'html' => $view->render()
        ]);
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

    public function store(StoreVehicleRequest $request)
    {
        $partner = Auth::user()->companyPartner;

        $partner->vehicles()->create($request->validated());

        $view = view('shop.layout.garage_slider')
            ->with('vehicles', $partner->vehicles);

        return response()->json([
            'type' => 'success',
            'message' => 'Транспорт успешно добавлен.',
            'html' => $view->render()
        ]);
    }

    public function destroy(DestroyVehicleRequest $request)
    {
        $partner = Auth::user()->companyPartner;

        $vehicle = Vehicle::find($request->vehicle_id);

        $vehicle->delete();

        $view = view('shop.layout.garage_slider')
            ->with('vehicles', $partner->vehicles);

        return response()->json([
            'type' => 'success',
            'message' => 'Транспорт успешно удалён.',
            'html' => $view->render()
        ]);
    }
}
