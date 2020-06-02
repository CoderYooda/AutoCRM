<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public static function vehicleDialog(Request $request)
    {
        $vehicle = Vehicle::find($request->vehicle_id);

        $tag = 'vehicleDialog' . ($vehicle->id ?? '');

        $view = view(get_template() . '.partner.dialog.form_vehicle', compact('request', 'vehicle', 'tag'))
            ->with('class', 'vehicleDialog')
            ->render();

        $response = [
            'tag' => $tag,
            'html' => $view,
        ];

        return response()->json($response);
    }
}
