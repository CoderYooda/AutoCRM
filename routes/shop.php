<?php

use Illuminate\Support\Facades\Route;

Route::namespace('Shop')->group(function () {

    Route::get('/', 'PageController@index')->name('pages.index');
    Route::get('/about', 'PageController@about')->name('pages.about');
    Route::get('/delivery', 'PageController@delivery')->name('pages.delivery');
    Route::get('/warranty', 'PageController@warranty')->name('pages.warranty');
    Route::get('/contacts', 'PageController@contacts')->name('pages.contacts');
    Route::get('/catalogue', 'PageController@catalogue')->name('pages.catalogue');

    Route::post('/feedback', 'FeedbackController@store')->name('feedback.store');

    Route::get('/favorites', 'FavoriteController@index')->name('favorites.index');
    Route::post('/favorites', 'FavoriteController@store')->name('favorites.store');

    Route::get('/cart', 'CartController@index')->name('cart.index');
    Route::post('/cart', 'CartController@store')->name('cart.store');
    Route::post('/cart/save', 'CartController@save')->name('cart.save');

    Route::get('/products/{product}/info', 'ProductController@info')->name('products.info');

    Route::get('/search', 'PageController@search')->name('pages.search');

    Route::get('/{path}', 'PageController@show')->where('path', '(.*)')->name('pages.path');
});
