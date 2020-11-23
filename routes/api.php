<?php

use Illuminate\Http\Request;

Route::get('/evotor/longPulling', 'API\EvotorController@longPulling');
Route::get('/evotor/getWarrantToPrint/{uuid}', 'API\EvotorController@getWarrantToPrint');
Route::get('/evotor/getWarrantItems/{id}', 'API\EvotorController@getWarrantItems');
Route::post('/evotor/setWarrantPayed', 'API\EvotorController@setWarrantPayed');

Route::post('login', 'Auth\LoginController@login')->name('PostLogin');

Route::group(['middleware' => ['auth:api']], function () {
    Route::post('/store/index', 'StoreController@index')->name('StoreIndex');
    Route::get('data/cash/aside', 'CategoryController@getCashAside')->name('getCashAside');
    Route::get('data/store/aside', 'CategoryController@getStoreAside')->name('getStoreAside');
    Route::get('data/user/aside', 'CategoryController@getUserAside')->name('getUserAside');


    Route::get('data/categories/show', 'Api_v2\CategoryController@show')->name('showCategory');


});
