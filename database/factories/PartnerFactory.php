<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;
use App\Models\Partner;

$factory->define(Partner::class, function (Faker $faker) {
    return [
        'category_id' =>  rand(5,7),
        'isfl' => rand(0,1),
        'balance' => rand(0, 100000000),
        'basePhone' => str_replace(array('(', ')', ' ', '-', '+'), '', substr_replace($faker->unique()->phoneNumber, 7, 0, 1)),
        'fio' => $faker->name,
        'birthday' => $faker->dateTimeBetween($startDate = '-80 years', $endDate = '-30 years'),
        'address' => $faker->city . ', ' . $faker->streetAddress . ' дом ' . rand(1, 233),
        'email' => $faker->unique()->safeEmail,
        'comment' => $faker->text(250),
        'barcode' => $faker->postcode,
        'companyName' => $faker->company,
        'ur_address' => $faker->city . ', ' . $faker->streetAddress . ' дом ' . rand(1, 233),
        'fact_address' => $faker->city . ', ' . $faker->streetAddress . ' дом ' . rand(1, 233),
        'inn' => rand(100000000000, 999999999999),
        'ogrn' => rand(1000000000000, 9999999999999),
        'bank' => rand(1000000000000000, 9999999999999999),
        'bik' => rand(100000000, 999999999),
        'kpp' => rand(100000000000, 999999999999)
    ];
});
