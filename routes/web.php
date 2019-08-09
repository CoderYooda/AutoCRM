<?php


Auth::routes();

Route::group(['middleware' => ['web', 'auth']], function () {
    #Статистика и панель управления
    Route::get('/', 'DashboardController@index')->name('DashboardIndex');

    #Категории
    Route::get('/categories', 'CategoryController@index')->name('Categories');
    Route::get('/categories/dialog/enter', 'CategoryController@enterDialog')->name('EnterDialog');
    Route::post('/categories/new', 'CategoryController@store')->name('StoreCategory');
    Route::post('/categories/remove={id}', 'CategoryController@remove')->name('RemoveCategory');

    #Продукты
    Route::get('/store', 'ProductController@index')->name('StoreIndex');
    Route::post('/store/new', 'ProductController@store')->name('StoreProduct');

    #Касса
    Route::get('/cash', 'CashController@index')->name('CashIndex');

    #Контрагенты
    Route::get('/partner', 'PartnerController@index')->name('PartnerIndex');

    #Отчеты
    Route::get('/report', 'ReportController@index')->name('ReportIndex');

    #Диалоги
    Route::get('/dialog_{tag}_open', 'DialogController@openDialogByTag')->name('openDialog');
});
