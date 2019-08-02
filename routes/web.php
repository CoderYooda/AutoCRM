<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');



#Статистика и панель управления
Route::get('/', 'DashboardController@index')->name('DashboardIndex');

#Продукты
Route::get('/store', 'ProductController@index')->name('StoreIndex');

#Касса
Route::get('/cash', 'CashController@index')->name('CashIndex');

#Контрагенты
Route::get('/partner', 'PartnerController@index')->name('PartnerIndex');

#Отчеты
Route::get('/report', 'ReportController@index')->name('ReportIndex');

