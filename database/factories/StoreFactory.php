<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\Store;
use Faker\Generator as Faker;

$factory->define(Store::class, function (Faker $faker) {
    return [
        'name' => 'Магазин на ' . $faker->streetAddress,
        'type' => 'casual',
        'locked' => 0
    ];
});
