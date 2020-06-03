<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Vehicle;
use App\Models\Partner;
use App\Models\VehicleMark;
use App\Models\VehicleModel;

use App\Models\VehicleModify;
use Faker\Generator as Faker;

use Illuminate\Support\Str;

$factory->define(Vehicle::class, function (Faker $faker) {

    $company_id = 2;

    $first_letter = chr(rand(65,90));
    $second_letter = chr(rand(65,90));
    $third_letter = chr(rand(65,90));

    $mark_id = VehicleMark::all()->random()->id;
    $model_id = VehicleModel::where('mark_id', $mark_id)->orderByRaw('RAND()')->first()->id;
    $modify_id = VehicleModify::where(['mark_id' => $mark_id, 'model_id' => $model_id])->orderByRaw('RAND()')->first()->id;

    return [
        'partner_id' => Partner::where('company_id', $company_id)->first()->id,
        'mark_id' => $mark_id,
        'model_id' => $model_id,
        'modify_id' => $modify_id,
        'vin_code' => Str::random(30),
        'year' => rand(2000, 2020),
        'numberplate' => $first_letter . rand(0, 999) . $second_letter . $third_letter . rand(0, 999)
    ];
});
