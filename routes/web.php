<?php


Auth::routes();

Route::group(['middleware' => ['web', 'auth']], function () {
    #Статистика и панель управления
    Route::get('/', 'DashboardController@index')->name('DashboardIndex');// Строгое название

//    #Производители
//    Route::get('/suppliers', 'SupplierController@index')->name('Categories');

    #Категории
    Route::get('/categories', 'CategoryController@index')->name('Categories');
    Route::get('/categories/dialog/enter', 'CategoryController@enterDialog')->name('EnterDialog');
    Route::post('/categories/new', 'CategoryController@store')->name('StoreCategory');
    Route::post('/categories/{id}/delete', 'CategoryController@remove')->name('DeleteCategory');

    #Продукты
    Route::get('/store', 'ProductController@index')->name('StoreIndex'); // Строгое название
    Route::get('/store/test', 'ProductController@test')->name('test');
    Route::get('/store/search', 'ProductController@search')->name('StoreSearch');
    Route::post('/product/new', 'ProductController@store')->name('StoreProduct');
    Route::post('/product/{id}/delete', 'ProductController@delete')->name('DeleteProduct');

    #Пставщики (внешние)
    Route::get('/providers/trinity/search_brands', 'Providers\TrinityApiController@searchBrands')->name('searchTrinityBrands');

    #Касса
    Route::get('/cash', 'CashController@index')->name('CashIndex');// Строгое название

    #Контрагенты
    Route::get('/partner', 'PartnerController@index')->name('PartnerIndex');// Строгое название
    Route::post('/partner/store', 'PartnerController@store')->name('StorePartner');

    #Телефоны
    Route::post('/phone/{id}/delete', 'PhoneController@removePhone')->name('RemovePhone');


    #Отчеты
    Route::get('/report', 'ReportController@index')->name('ReportIndex');// Строгое название

    #Диалоги
    Route::get('/dialog_{tag}_open', 'DialogController@openDialogByTag')->name('openDialog');
});
