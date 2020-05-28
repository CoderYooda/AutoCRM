<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\Company;
use Faker\Generator as Faker;

$factory->define(Company::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'blocked' => rand(0, 100) == 1 ? true : false,
        'payed_days' => rand(0, 880),
    ];
});