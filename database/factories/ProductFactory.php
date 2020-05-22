<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Models\Article::class, function (Faker $faker) {

    $article = \App\Http\Controllers\HelpController::generateRandomArticle(rand(5, 10));
    $name = $faker->realText(250);
    $barcode = $faker->ean13();
    $prepared_article = mb_strtolower(str_replace(' ', '', $article));
    $prepared_name = mb_strtolower(str_replace(' ', '', $name));
    $prepared_barcode = mb_strtolower(str_replace(' ', '', $barcode));

    return [
        'foundstring' => $prepared_article . $prepared_barcode . $prepared_name,
        'article' => $article,
        'oem' => $faker->ean13(),
        'storeCode' => $faker->ean13(),
        'barcode_local' => $faker->ean13(),
        'barcode' => $faker->ean13(),
        'name' => $name,
        'blockedCount' => 0,
    ];
});
