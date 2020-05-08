<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public static function upsertCar($request)
    {
        return Car::updateOrCreate(['id' => $request->car_id], [
           'number' => $request->number,
           'issued_by' => $request->issued_by
        ]);
    }
}
