<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Garage;
use App\Models\Partner;
use App\Models\VehicleMark;
use App\Models\VehicleModel;

use Faker\Generator as Faker;

use Illuminate\Support\Str;

$factory->define(Garage::class, function (Faker $faker) {

    $company_id = 2;

    return [
        'partner_id' => Partner::where('company_id', $company_id)->first()->id,
        'mark_id' => VehicleMark::all()->random()->id,
        'model_id' => VehicleModel::all()->random()->id,
        'vin_code' => Str::random(30),
        'year' => rand(2000, 2020)
    ];
});
