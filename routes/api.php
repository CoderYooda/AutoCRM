<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/evotor/longPulling', 'API\EvotorController@longPulling');
Route::get('/evotor/getWarrantToPrint/{uuid}', 'API\EvotorController@getWarrantToPrint');
Route::get('/evotor/getWarrantItems/{id}', 'API\EvotorController@getWarrantItems');

Route::post('/evotor/setWarrantPayed', 'API\EvotorController@setWarrantPayed');


Route::middleware('auth:api')->group(function() {

    Route::post('/product/store', 'ProductController@store')->name('APIStoreProduct');

});
