<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public static function upsertCar($request)
    {
        if(isset($request['car_id'])){
            $car = Car::where('id', $request['car_id'])->first();
        } else {
            $car = new Passport();
        }
        $car->number = $request['number'];
        $car->issued_by = $request['issued_by'];
        $passport->save();

        return $passport;
    }
}
