<?php

use Illuminate\Support\Facades\Route;

Route::namespace('Shop')->group(function () {

    Route::middleware('auth')->group(function () {
        Route::get('/user/logout', 'UserController@logout')->name('user.logout');

        Route::get('/user', 'UserController@index')->name('user.index');
        Route::post('/user/save', 'UserController@save')->name('user.save');
        Route::post('/user/delivery/save', 'UserController@saveDelivery')->name('user.saveDelivery');
        Route::post('/user/vehicles', 'VehicleController@store')->name('vehicles.store');
        Route::delete('/user/vehicles', 'VehicleController@destroy')->name('vehicles.destroy');
        Route::get('/user/vehicles/{vehicle}/edit', 'VehicleController@edit')->name('vehicles.edit');
        Route::patch('/user/vehicles/{vehicle}', 'VehicleController@update')->name('vehicles.update');

        Route::get('/models/{mark}/list', 'VehicleController@modelList');
        Route::get('/modifies/{mark}/{model}/list', 'VehicleController@modifyList');
    });

    Route::middleware('guest')->group(function () {
        Route::get('/user/login', 'UserController@loginForm')->name('user.loginForm');
        Route::post('/user/login', 'UserController@loginAction')->name('user.loginAction');
        Route::get('/user/register', 'UserController@registerForm')->name('user.registerForm');
        Route::post('/user/register', 'UserController@registerAction')->name('user.registerAction');
    });

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
    Route::post('/cart/delete', 'CartController@delete')->name('cart.delete');
    Route::post('/cart/save', 'CartController@save')->name('cart.save');
    Route::post('/cart/clear', 'CartController@clear')->name('cart.clear');
    Route::post('/cart/order', 'CartController@order')->name('cart.order');

    Route::get('/orders/{order}', 'OrderController@show')->name('orders.success');

    Route::get('/products/{product}/info', 'ProductController@info')->name('products.info');

    Route::get('/search', 'PageController@search')->name('pages.search');

    Route::get('/{path}', 'PageController@show')->where('path', '(.*)')->name('pages.path');
});
