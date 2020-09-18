<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    $path = public_path('/landing/index.html');

    return file_get_contents($path);
});
