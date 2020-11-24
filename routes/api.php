<?php

Route::get('/evotor/longPulling', 'API\EvotorController@longPulling');
Route::get('/evotor/getWarrantToPrint/{uuid}', 'API\EvotorController@getWarrantToPrint');
Route::get('/evotor/getWarrantItems/{id}', 'API\EvotorController@getWarrantItems');

Route::post('/evotor/setWarrantPayed', 'API\EvotorController@setWarrantPayed');

Route::namespace('API')->group(function() {

    Route::get('/categories/{category_id}/breadcrumbs', 'CategoryController@breadcrumbs')->name('categories.breadcrumbs');

    Route::post('/products/store', 'ProductController@store')->name('products.store');
    Route::get('/products/{product_id}', 'ProductController@show')->name('products.show');

});
