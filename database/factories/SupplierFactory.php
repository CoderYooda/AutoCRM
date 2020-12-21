<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Models\Supplier::class, function (Faker $faker) {
    return [
        'name' => \App\Http\Controllers\HelpController::generateRandomString(rand(3,8))
    ];
});
