<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    $path = public_path('/landing/index.html');

    return file_get_contents($path);
});
Route::get('/shop', function () {

    $path = public_path('/landing/shop.html');

    return file_get_contents($path);
});
