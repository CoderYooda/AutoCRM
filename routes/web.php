<?php


Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
// Registration Routes...
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');
// Password Reset Routes...
Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

#СМС
Route::post('/sms/confirm', 'SmsController@confirm')->name('SmsConfirmate');


Route::group(['middleware' => ['web', 'auth']], function () {
    #Статистика и панель управления
    Route::get('/', 'DashboardController@index')->name('DashboardIndex');// Строгое название

    #Производители
    Route::post('/suppliers/store', 'SupplierController@store')->name('StoreSupplier');
    Route::post('/suppliers/dialog/search', 'SupplierController@dialogSearch')->name('SupplierDialogSearch');
    Route::post('/suppliers/{id}/select', 'SupplierController@select')->name('SelectSupplier');

    #Настройки
    Route::get('/settings', 'SettingsController@index')->name('SettingsIndex'); // Строгое название

    #Категории
    Route::get('/categories', 'CategoryController@index')->name('Categories');
    Route::get('/categories/dialog/enter', 'CategoryController@enterDialog')->name('EnterDialog');
    Route::post('/category/dialog/search', 'CategoryController@dialogSearch')->name('CategoryDialogSearch');
    Route::post('/category/store', 'CategoryController@store')->name('StoreCategory');
    Route::post('/category/{id}/delete', 'CategoryController@delete')->name('DeleteCategory');
    Route::post('/category/{id}/select', 'CategoryController@select')->name('SelectCategory');

    #Продукты
    Route::get('/store/test', 'ProductController@test')->name('test');
    Route::post('/store/search', 'ProductController@search')->name('StoreSearch');
    Route::post('/product/store', 'ProductController@store')->name('StoreProduct');
    Route::post('/product/{id}/delete', 'ProductController@delete')->name('DeleteProduct');
    Route::post('/product/dialog/search', 'ProductController@dialogSearch')->name('ProductDialogSearch');
    Route::post('/product/addtolist', 'ProductController@addToList')->name('ProductAddToList');

    #Поступления товаров
    Route::get('/entrance/events', 'EntranceController@events')->name('EntranceOrderEvents');// Строгое название
    Route::post('/entrance/store', 'EntranceController@store')->name('StoreEntrance');
    Route::post('/entrance/{id}/get_products', 'EntranceController@getEntranceProducts')->name('GetEntranceProducts');
    Route::post('/entrance/{id}/delete', 'EntranceController@delete')->name('DeleteEntrance');
    Route::post('/entrance/{id}/fresh', 'EntranceController@fresh')->name('FreshEntrance');

    #Поставщики (внешние)
    Route::post('/providers/trinity/search_brands', 'Providers\TrinityApiController@searchBrands')->name('searchTrinityBrands');
    Route::post('/provider/search', 'Providers\TrinityApiController@search')->name('ProviderSearch');

    #Продажи
    Route::get('/shipment/events', 'ShipmentsController@events')->name('ShipmentEvents');// Строгое название
    Route::post('/shipment/store', 'ShipmentsController@store')->name('StoreShipment');// Строгое название
    Route::post('/shipment/{id}/get_products', 'ShipmentsController@getShipmentProducts')->name('GetShipmentProducts');
    Route::post('/shipment/search', 'ShipmentsController@search')->name('ShipmentPageSearch');
    Route::post('/shipment/{id}/delete', 'ShipmentsController@delete')->name('DeleteShipment');
    Route::post('/shipment/{id}/fresh', 'ShipmentsController@fresh')->name('FreshShipment');

    #Заказы клиентов
    Route::get('/clientorder/events', 'ClientOrdersController@events')->name('ClientOrderEvents');// Строгое название
    Route::post('/clientorder/store', 'ClientOrdersController@store')->name('StoreClientOrder');// Строгое название
    Route::post('/clientorder/{id}/get_clientorders', 'ClientOrdersController@getClientOrdersProducts')->name('GetClientOrderProducts');
    Route::post('/clientorder/search', 'ClientOrdersController@search')->name('ClientOrderPageSearch');
    Route::post('/client_order/{id}/delete', 'ClientOrdersController@delete')->name('DeleteClientOrder');
    Route::post('/clientorder/{id}/fresh', 'ClientOrdersController@fresh')->name('FreshClientOrder');

    #Заказы Поставщикам
    Route::post('/providerorder/store', 'ProviderOrdersController@store')->name('StoreProviderOrder');// Строгое название
    Route::post('/providerorder/{id}/get_providerorders', 'ProviderOrdersController@getProviderOrderProducts')->name('GetProviderOrderProducts');
    Route::post('/providerorder/search', 'ProviderOrdersController@search')->name('ProviderOrderPageSearch');
    Route::post('/providerorder/{id}/delete', 'ProviderOrdersController@delete')->name('DeleteProviderOrder');
    Route::post('/providerorder/dialog/search', 'ProviderOrdersController@dialogSearch')->name('ProviderOrderDialogSearch');
    Route::post('/providerorder/{id}/select', 'ProviderOrdersController@select')->name('SelectProviderOrder');
    Route::post('/providerorder/{id}/loaditems', 'ProviderOrdersController@loadItems')->name('LoadItemsProviderOrder');
    Route::post('/providerorder/{id}/fresh', 'ProviderOrdersController@fresh')->name('FreshProviderOrder');

    #Касса##############################################################################################
    Route::get('/cash', 'CashController@index')->name('CashIndex');// Строгое название

    #Кассовые операции
    Route::get('/warrant/events', 'WarrantController@events')->name('WarrantOrderEvents');// Строгое название
    Route::post('/warrant/store', 'WarrantController@store')->name('StoreWarrant');// Строгое название
    Route::post('/warrant/search', 'WarrantController@search')->name('WarrantPageSearch');
    Route::post('/warrant/{id}/delete', 'WarrantController@delete')->name('DeleteWarrant');

    #Движение средств между кассами
    Route::post('/cashmove/store', 'MoneyMoveController@store')->name('StoreMoneyMove');// Строгое название
    Route::post('/cashmove/search', 'MoneyMoveController@search')->name('MoneyMovePageSearch');
    #/Касса##############################################################################################


    #Кассовые аппараты
    Route::post('/cashbox/new', 'CashboxController@store')->name('StoreCashbox');
    Route::post('/cashbox/{id}/delete', 'CashboxController@delete')->name('DeleteCashbox');
    Route::post('/cashbox/{id}/select', 'CashboxController@select')->name('SelectCashbox');
    Route::post('/cashbox/dialog/search', 'CashboxController@dialogSearch')->name('CashboxDialogSearch');

    #Статьи движения денежных средств
    Route::post('/ddsarticle/new', 'DdsarticleController@store')->name('StoreDdsarticle');
    Route::post('/ddsarticle/{id}/delete', 'DdsarticleController@delete')->name('DeleteDdsarticle');
    Route::post('/ddsarticle/{id}/select', 'DdsarticleController@select')->name('SelectDdsarticle');
    Route::post('/ddsarticle/dialog/search', 'DdsarticleController@dialogSearch')->name('DdsarticleDialogSearch');

    #Склады
    Route::get('/store', 'StoreController@index')->name('StoreIndex'); // Строгое название
    Route::post('/store/new', 'StoreController@store')->name('StoreStore');
    Route::post('/store/{id}/delete', 'StoreController@delete')->name('DeleteStore');

    #Услуги
    Route::get('/services', 'ServicesController@index')->name('ServicesIndex');

    #Сотрудники
    Route::get('/employee/resources', 'EmployeeController@resources')->name('EmployeeResources');
    Route::get('/employee', 'EmployeeController@index')->name('EmployeeIndex');


    #Пользователь
    Route::get('/user', 'UserController@index')->name('UserIndex');
    Route::post('/user/salary_schema', 'UserController@saveSalarySchemaToUser')->name('SyncSalarySchemaToUser');
    Route::post('/user/get_channel', 'UserController@getChannel')->name('GetUserChannel');

    #Календарь
    Route::get('/calendar', 'CalendarController@index')->name('CalendarIndex');

    #Планировщик
    Route::get('/schedule', 'ScheduleController@index')->name('ScheduleIndex');

    #Контрагенты
    Route::get('/partner', 'PartnerController@index')->name('PartnerIndex');// Строгое название
    Route::post('/partner/search', 'PartnerController@search')->name('PartnerPageSearch');
    Route::post('/partner/store', 'PartnerController@store')->name('StorePartner');
    Route::post('/partner/{id}/delete', 'PartnerController@delete')->name('DeletePartner');
    Route::post('/partner/dialog/search', 'PartnerController@dialogSearch')->name('PartnerDialogSearch');
    Route::post('/partner/{id}/select', 'PartnerController@select')->name('SelectPartner');

    #Телефоны
    Route::post('/phone/{id}/delete', 'PhoneController@removePhone')->name('RemovePhone');



    #Отчеты
    Route::get('/report', 'SmsController@index')->name('ReportIndex');// Строгое название

    #Диалоги
    Route::get('/dialog_{tag}_open', 'DialogController@openDialogByTag')->name('openDialog');

    #Штрихкоды
    Route::post('/barcode/search', 'BarcodeController@search')->name('BarcodeSearch');

    Route::group(['prefix' => 'ws'], function(){

        Route::get('/check-auth', function(){
            return response()->json([
                'auth' => Auth::check()
            ]);
        });

        Route::get('/check-sub/{channel}', function($channel){
            return response()->json([
                'can' => Auth::check()
            ]);
        });
    });
});
