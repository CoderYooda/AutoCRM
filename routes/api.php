<?php

Route::get('/evotor/longPulling', 'API\EvotorController@longPulling');
Route::get('/evotor/getWarrantToPrint/{uuid}', 'API\EvotorController@getWarrantToPrint');
Route::get('/evotor/getWarrantItems/{id}', 'API\EvotorController@getWarrantItems');
Route::post('/evotor/setWarrantPayed', 'API\EvotorController@setWarrantPayed');

Route::namespace('API')->middleware('auth:api')->group(function() {

    Route::get('/categories/{category}', 'CategoryController@show')->name('categories.show');
    Route::get('/categories/{category}/children', 'CategoryController@children')->name('categories.children');
    Route::patch('/categories/{category}', 'CategoryController@update')->name('categories.update');
    Route::get('/categories', 'CategoryController@all')->name('categories.all');
    Route::post('/categories', 'CategoryController@store')->name('categories.store');

    Route::post('/products/store', 'ProductController@store')->name('products.store');
    Route::get('/products/{product}', 'ProductController@show')->name('products.show');
});
