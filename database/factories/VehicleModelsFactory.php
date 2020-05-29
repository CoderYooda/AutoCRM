<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\VehicleModel;
use Faker\Generator as Faker;

$factory->define(VehicleModel::class, function (Faker $faker) {
    return [
        'name' => $faker->realText(15)
    ];
});
