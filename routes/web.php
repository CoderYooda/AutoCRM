<?php


Auth::routes();

Route::group(['middleware' => ['web', 'auth']], function () {
    #Статистика и панель управления
    Route::get('/', 'DashboardController@index')->name('DashboardIndex');// Строгое название

//    #Производители
//    Route::get('/suppliers', 'SupplierController@index')->name('Categories');

    #Настройки
    Route::get('/settings', 'SettingsController@index')->name('SettingsIndex'); // Строгое название

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
    Route::post('/product/dialog/search', 'ProductController@dialogSearch')->name('ProductDialogSearch');
    Route::post('/product/{id}/addtolist', 'ProductController@addToList')->name('ProductAddToList');

    #Поступления товаров
    Route::post('/entrance/new', 'EntranceController@store')->name('StoreEntrance');
    Route::post('/entrance/{id}/get_products', 'EntranceController@getEntranceProducts')->name('GetEntranceProducts');

    #Пставщики (внешние)
    Route::get('/providers/trinity/search_brands', 'Providers\TrinityApiController@searchBrands')->name('searchTrinityBrands');

    #Касса
    Route::get('/cash', 'CashController@index')->name('CashIndex');// Строгое название

    #Кассовые аппараты
    Route::post('/cashbox/new', 'CashboxController@store')->name('StoreCashbox');
    Route::post('/cashbox/{id}/delete', 'CashboxController@delete')->name('DeleteCashbox');

    #Статьи движения денежных средств
    Route::post('/ddsarticle/new', 'DdsarticleController@store')->name('StoreDdsarticle');
    Route::post('/ddsarticle/{id}/delete', 'DdsarticleController@delete')->name('DeleteDdsarticle');

    #Склады
    Route::post('/store/new', 'StoreController@store')->name('StoreStore');
    Route::post('/store/{id}/delete', 'StoreController@delete')->name('DeleteStore');

    #Контрагенты
    Route::get('/partner', 'PartnerController@index')->name('PartnerIndex');// Строгое название
    Route::post('/partner/store', 'PartnerController@store')->name('StorePartner');
    Route::post('/partner/{id}/delete', 'PartnerController@delete')->name('DeletePartner');
    Route::post('/partner/dialog/search', 'PartnerController@dialogSearch')->name('DialogSearch');
    Route::post('/partner/{id}/select', 'PartnerController@select')->name('SelectPartner');

    #Телефоны
    Route::post('/phone/{id}/delete', 'PhoneController@removePhone')->name('RemovePhone');

    #Отчеты
    Route::get('/report', 'ReportController@index')->name('ReportIndex');// Строгое название

    #Диалоги
    Route::get('/dialog_{tag}_open', 'DialogController@openDialogByTag')->name('openDialog');
});
