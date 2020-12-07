<?php

Route::get('/evotor/longPulling', 'API\EvotorController@longPulling');
Route::get('/evotor/getWarrantToPrint/{uuid}', 'API\EvotorController@getWarrantToPrint');
Route::get('/evotor/getWarrantItems/{id}', 'API\EvotorController@getWarrantItems');
Route::post('/evotor/setWarrantPayed', 'API\EvotorController@setWarrantPayed');

Route::post('login', 'Auth\LoginController@login')->name('PostLogin');

Route::namespace('API')->middleware('auth:api')->group(function() {

    Route::get('/categories/{category}', 'CategoryController@show')->name('categories.show');
    Route::get('/categories/{category}/children', 'CategoryController@children')->name('categories.children');
    Route::patch('/categories/{category}', 'CategoryController@update')->name('categories.update');
    Route::post('/categories', 'CategoryController@store')->name('categories.store');
    Route::delete('/categories/{category}', 'CategoryController@delete')->name('categories.delete');


    Route::patch('/products/{product}', 'ProductController@update')->name('products.update');
    Route::post('/products', 'ProductController@store')->name('products.store');
    Route::get('/products/{product}', 'ProductController@show')->name('products.show');


    Route::get('/settings', 'SettingController@show')->name('settings.show');


    Route::post('/image/upload',   'ImageController@upload')->name('uploadImage');

    Route::get('/store/base/table_data',   'StoreController@tableData')->name('getStoreData');
    Route::get('/provider_order/base/table_data',   'ProviderOrderController@tableData')->name('getPOData');
    Route::get('/entrance/base/table_data',   'EntranceController@tableData')->name('getEData');
    Route::get('/entrance_refund/base/table_data',   'EntranceRefundController@tableData')->name('getERData');
});


