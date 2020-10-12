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

    Route::get('/categories', 'CategoryController@index')->name('categories.index');
});
