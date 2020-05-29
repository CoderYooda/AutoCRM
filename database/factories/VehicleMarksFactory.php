<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\VehicleMark;
use Faker\Generator as Faker;

$factory->define(VehicleMark::class, function (Faker $faker) {
    return [
        'name' => $faker->realText(15)
    ];
});
