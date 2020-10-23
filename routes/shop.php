<?php

use Illuminate\Support\Facades\Route;

Route::namespace('Shop')->group(function () {

    Route::get('/', 'PageController@index')->name('pages.index');
    Route::get('/about', 'PageController@about')->name('pages.about');
    Route::get('/delivery', 'PageController@delivery')->name('pages.delivery');
    Route::get('/warranty', 'PageController@warranty')->name('pages.warranty');
    Route::get('/contacts', 'PageController@contacts')->name('pages.contacts');
    Route::get('/catalogue', 'PageController@catalogue')->name('pages.catalogue');

    Route::get('/user/login', 'UserController@loginForm')->name('user.loginForm');
    Route::post('/user/login', 'UserController@loginAction')->name('user.loginAction');
    Route::get('/user/register', 'UserController@registerForm')->name('user.registerForm');
    Route::post('/user/register', 'UserController@registerAction')->name('user.registerAction');

    Route::post('/feedback', 'FeedbackController@store')->name('feedback.store');

    Route::get('/favorites', 'FavoriteController@index')->name('favorites.index');
    Route::post('/favorites', 'FavoriteController@store')->name('favorites.store');

    Route::get('/cart', 'CartController@index')->name('cart.index');
    Route::post('/cart', 'CartController@store')->name('cart.store');
    Route::post('/cart/delete', 'CartController@delete')->name('cart.delete');
    Route::post('/cart/save', 'CartController@save')->name('cart.save');
    Route::post('/cart/clear', 'CartController@clear')->name('cart.clear');
    Route::post('/cart/order', 'CartController@order')->name('cart.order');

    Route::get('/orders/{order}', 'OrderController@show')->name('orders.success');

    Route::get('/products/{product}/info', 'ProductController@info')->name('products.info');

    Route::get('/search', 'PageController@search')->name('pages.search');

    Route::get('/{path}', 'PageController@show')->where('path', '(.*)')->name('pages.path');
});
