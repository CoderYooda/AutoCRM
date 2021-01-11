<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Models\Product::class, function (Faker $faker) {

    $json = json_decode(file_get_contents('public/demo/articles.json'));
    $item_index = rand(0,count($json));

    $article = \App\Http\Controllers\HelpController::generateRandomArticle(rand(5, 10));
    $name = $json[$item_index]->name;
    $barcode = $faker->ean13();
//    $prepared_article = $json[$item_index]->product;
//    $prepared_name = mb_strtolower(str_replace(' ', '', $name));
//    $prepared_barcode = mb_strtolower(str_replace(' ', '', $barcode));

    return [
        'article' => $article,
        'oem' => $faker->ean13(),
        'barcode_local' => $faker->ean13(),
        'barcode' => $faker->ean13(),
        'name' => $name,
        'blockedCount' => 0,
    ];
});
