<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\VehicleMark;
use App\Models\VehicleModel;
use Faker\Generator as Faker;

$factory->define(VehicleModel::class, function (Faker $faker) {
    return [
        'mark_id' => VehicleMark::all()->random()->id,
        'name' => $faker->realText(15)
    ];
});
