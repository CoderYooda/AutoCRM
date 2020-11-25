<?php

Route::get('/evotor/longPulling', 'API\EvotorController@longPulling');
Route::get('/evotor/getWarrantToPrint/{uuid}', 'API\EvotorController@getWarrantToPrint');
Route::get('/evotor/getWarrantItems/{id}', 'API\EvotorController@getWarrantItems');
Route::post('/evotor/setWarrantPayed', 'API\EvotorController@setWarrantPayed');

Route::post('login', 'Auth\LoginController@login')->name('PostLogin');

Route::namespace('API')->middleware('auth:api')->group(function() {
    Route::get('/categories/{category}', 'CategoryController@show')->name('categories.show');
    Route::patch('/categories/{category}', 'CategoryController@update')->name('categories.update');
    Route::get('/categories', 'CategoryController@all')->name('categories.all');
    Route::post('/categories', 'CategoryController@store')->name('categories.store');
    Route::post('/products/store', 'ProductController@store')->name('products.store');
    Route::get('/products/{product}', 'ProductController@show')->name('products.show');


});
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/store/base/table_data',   'Api_v2\StoreController@tableData')->name('getStoreData');
    Route::get('data/cash/aside', 'CategoryController@getCashAside')->name('getCashAside');
    Route::get('data/store/aside', 'CategoryController@getStoreAside')->name('getStoreAside');
    Route::get('data/user/aside', 'CategoryController@getUserAside')->name('getUserAside');
});

//
//
//Route::post('login', 'Auth\LoginController@login')->name('PostLogin');
//
//Route::group(['middleware' => ['auth:api']], function () {
//    Route::post('/store/index', 'StoreController@index')->name('StoreIndex');

//
//
//    Route::get('data/categories/show',  'Api_v2\CategoryController@show')->name('showCategory');
//    Route::get('data/categories/get',   'Api_v2\CategoryController@get')->name('getCategories');
//    Route::get('store/base/table_data',   'Api_v2\StoreController@tableData')->name('getStoreData');
