<?php

use Illuminate\Support\Facades\Route;

//Точка входа
Route::get('/{any?}/{an2y?}/{a3ny?}', function(){
    return view('index');
})->name('Index');



Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('PostLogin');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
// Registration Routes...
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');
Route::post('sms_retry', 'Auth\RegisterController@smsRetry');
// Password Reset Routes...
Route::get('password/reset', 'Auth\ForgotPasswordController@resetForm')->name('PassReset');
Route::post('password/reset', 'Auth\ForgotPasswordController@reset')->name('PassResetPost');
Route::post('password/reset/sendsms', 'Auth\ForgotPasswordController@sendSMS')->name('PassResetsendSMS');
Route::post('password/reset/confirmsms', 'Auth\ForgotPasswordController@confirmSMS')->name('PassResetconfirmSMS');

Route::view('/test', 'shop.emails.success_order');

#Шаблон интренет магазина
Route::get('shop/index', 'TestController@index')->name('ShopIndex');

#СМС
Route::post('/sms/confirm', 'SmsController@confirm')->name('SmsConfirmate');

#Тариф
Route::post('/tariff/get_payment', 'TariffController@takePayment')->name('TakePayment');
Route::post('/tariff/check_payment', 'TariffController@checkPayment')->name('CheckPayment');
Route::post('/tariff/check_sms_payment', 'TariffController@checkSmsPayment')->name('CheckSmsPayment');

Route::group(['middleware' => ['web', 'auth', 'banned']], function () {

    #Пользователь
    Route::get('/user/', 'UserController@index')->name('UserIndex');
    Route::get('/user/edit', 'UserController@edit')->name('UserEdit');
    Route::post('/user/update-image', 'UserController@updateImage')->name('UserUpdateImage');

    Route::get('/user/password/edit', 'UserController@passwordEdit')->name('UserPassChange');
    Route::post('/user/password/save', 'UserController@passwordStore')->name('UserPassStore');

    Route::post('/user/salary_schema', 'UserController@saveSalarySchemaToUser')->name('SyncSalarySchemaToUser');
    Route::get('/salary/{id}/get', 'SalarySchemaController@getSchemaById')->name('GetSchemaById');

    Route::middleware('hasPayedDays')->group(function () {
        Route::get('/', function () {
            $redir = Auth::user()->hasRole('Суперадмин') ? route('AdminDashboard') : route('StoreIndex');
            return redirect($redir);
        });

        #Производители
        Route::post('/suppliers/store', 'SupplierController@store')->name('StoreSupplier');
        Route::post('/suppliers/dialog/search', 'SupplierController@dialogSearch')->name('SupplierDialogSearch');
        Route::post('/suppliers/{id}/select', 'SupplierController@select')->name('SelectSupplier');

        #Настройки
        Route::get('/settings', 'SettingsController@index')->name('SettingsIndex'); // Строгое название

        Route::post('/settings/base/store', 'SettingsController@baseStore')->name('BaseSettingsStore');
        Route::post('/settings/base/fresh', 'SettingsController@freshBaseStore')->name('FreshBaseStore');
        Route::post('/settings/company/save', 'SettingsController@saveCompanySettings')->name('SaveCompanySettings');

        #Категории
        Route::post('/category/loadview', 'CategoryController@loadAside')->name('LoadAsideCategory');
        Route::get('/categories', 'CategoryController@index')->name('Categories');
        Route::get('/categories/dialog/enter', 'CategoryController@enterDialog')->name('EnterDialog');
        Route::post('/category/dialog/search', 'CategoryController@dialogSearch')->name('CategoryDialogSearch');
        Route::post('/category/store', 'CategoryController@store')->name('StoreCategory');
        Route::post('/category/{id}/delete', 'CategoryController@delete')->name('DeleteCategory');
        Route::post('/category/{id}/select', 'CategoryController@select')->name('SelectCategory');

        Route::post('/category/breadcrumbs', 'CategoryController@loadBreadcrumbs')->name('LoadBreadCrumbs');

        #Статистика
        Route::get('/statistic', 'StatisticController@index')->name('StatisticIndex');
        Route::get('/statistic/show', 'StatisticController@show')->name('StatisticShow');

        #Продукты
        Route::post('/store/search', 'ProductController@search')->name('StoreSearch');
        Route::post('/product/store', 'ProductController@store')->name('StoreProduct');
        Route::post('/product/{id}/delete', 'ProductController@delete')->name('DeleteProduct');
        Route::post('/product/dialog/search', 'ProductController@dialogSearch')->name('ProductDialogSearch');
        Route::post('/product/addtolist', 'ProductController@addToList')->name('ProductAddToList');
        Route::post('/product/getByUpc', 'ProductController@getByUpc')->name('GetProductByUpc');
        Route::post('/product/{product}/price', 'ProductController@getPrice')->name('GetProductPrice');

        #Поступления товаров
        Route::get('/entrance/events', 'EntranceController@events')->name('EntranceOrderEvents');// Строгое название
        Route::post('/entrance/store', 'EntranceController@store')->name('StoreEntrance');
        Route::post('/entrance/{id}/get_products', 'EntranceController@getEntranceProducts')->name('GetEntranceProducts');
        Route::post('/entrance/{entrance}/fresh', 'EntranceController@fresh')->name('FreshEntrance');
        Route::post('/entrance/tabledata', 'EntranceController@tableData')->name('StoreEntranceData');
        Route::post('/entrance/side_info', 'EntranceController@getPartnerSideInfo')->name('GetEntrancePartnerSideInfo');
        Route::post('/entrance/dialog/search', 'EntranceController@dialogSearch')->name('EntranceDialogSearch');
        Route::post('/entrance/{entrance}/select', 'EntranceController@select')->name('SelectEntrance');

        #Возвраты поступлений
        Route::post('/entrance_refunds/tabledata', 'EntranceRefundController@tableData')->name('StoreEntranceRefundData');
        Route::post('/entrance_refunds/store', 'EntranceRefundController@store')->name('StoreEntranceRefund');
        Route::post('/entrance_refunds/side_info', 'EntranceRefundController@getSideInfo')->name('GetEntranceRefundSideInfo');

        Route::post('/products/{product}/restore', 'ProductController@restore')->name('RestoreProduct');

        #Поставщики (внешние)
        Route::namespace('API')->prefix('api')->group(function () {
            Route::get('/manufacturers/{article}', 'AnalogController@getManufacturersByArticle')->name('searchManufacturers');
            Route::get('/bik/{bik}', 'BikController@getInfo')->name('getBikInfo');
            Route::get('/inn/{inn}', 'InnController@getInfo')->name('getInnInfo');
        });

        Route::post('/analogues', 'StoreController@getAnalogues')->name('searchAnalogues');

        Route::namespace('API')->group(function () {

            Route::post('/provider_stores/cart/add', 'ProviderStoreController@addCart')->name('ProviderCartAdd');
            Route::post('/provider_stores/cart/set', 'ProviderStoreController@setCart')->name('ProviderCartSet');
            Route::post('/provider_stores/cart/delete', 'ProviderStoreController@deleteCart')->name('ProviderCartDelete');
            Route::post('/provider_stores/cart/reset', 'ProviderStoreController@resetCart')->name('ProviderCartReset');
            Route::post('/provider_stores/cart/order', 'ProviderStoreController@orderCart')->name('ProviderCartOrder');
            Route::post('/provider_stores/cart/provider/delete', 'ProviderStoreController@deleteCartProvider')->name('ProviderCartDeleteProvider');

            Route::post('/provider_stores/tableData', 'ProviderStoreController@tableData')->name('ProviderTableData');
            Route::post('/provider_stores/stores', 'ProviderStoreController@getStores')->name('getProviderStores');
            Route::get('/provider_stores/armtek/sales_organization', 'ProviderStoreController@getArmTekSerialSales')->name('getArmTekSerialSales');
        });


        Route::post('/provider/search', 'Providers\TrinityApiController@search')->name('ProviderSearch');

        #Продажи
        Route::get('/shipment/events', 'ShipmentController@events')->name('ShipmentEvents');// Строгое название
        Route::middleware('throttle:5,1')->post('/shipment/store', 'ShipmentController@store')->name('StoreShipment');// Строгое название
        Route::post('/shipment/{shipment}/get_products', 'ShipmentController@getShipmentProducts')->name('GetShipmentProducts');
        Route::post('/shipment/search', 'ShipmentController@search')->name('ShipmentPageSearch');
        Route::post('/shipment/{id}/delete', 'ShipmentController@delete')->name('DeleteShipment');
        Route::post('/shipment/{shipment}/fresh', 'ShipmentController@fresh')->name('FreshShipment');
        Route::post('/shipment/{shipment}/select', 'ShipmentController@select')->name('SelectShipment');
        Route::post('/shipment/dialog/search', 'ShipmentController@dialogSearch')->name('ShipmentDialogSearch');
        Route::post('/shipments/tabledata', 'ShipmentController@tableData')->name('StoreShipmentData');
        Route::post('/shipments/side_info', 'ShipmentController@getSideInfo')->name('GetShipmentSideInfo');

        #Заказы клиентов
        Route::get('/clientorder/events', 'ClientOrdersController@events')->name('ClientOrderEvents');// Строгое название
        Route::post('/clientorder/store', 'ClientOrdersController@store')->name('StoreClientOrder');// Строгое название
        Route::post('/clientorder/{clientOrder}/get_clientorders', 'ClientOrdersController@getClientOrdersProducts')->name('GetClientOrderProducts');
        Route::post('/clientorder/search', 'ClientOrdersController@search')->name('ClientOrderPageSearch');
        Route::post('/clientorder/{id}/delete', 'ClientOrdersController@delete')->name('DeleteClientOrder');
        Route::post('/clientorder/{client_order}/fresh', 'ClientOrdersController@fresh')->name('FreshClientOrder');
        Route::post('/client_orders/tabledata', 'ClientOrdersController@tableData')->name('StoreClientOrderData');
        Route::post('/client_orders/side_info', 'ClientOrdersController@getSideInfo')->name('GetClientOrderSideInfo');
        Route::get('/client_orders/{clientOrder}/select', 'ClientOrdersController@select')->name('SelectClientOrder');
        Route::post('/client_orders/makeshipped', 'ClientOrdersController@makeShipped')->name('MakeDhippedClientOrder');
        Route::get('/clientorders', 'ClientOrdersController@selectDialog')->name('GetClientOrders');

        #Заказы Поставщикам
        Route::post('/providerorder/store', 'ProviderOrdersController@store')->name('StoreProviderOrder');// Строгое название
        Route::post('/providerorder/{id}/get_providerorders', 'ProviderOrdersController@getProviderOrderProducts')->name('GetProviderOrderProducts');
        Route::post('/providerorder/search', 'ProviderOrdersController@search')->name('ProviderOrderPageSearch');
        Route::post('/providerorder/{id}/delete', 'ProviderOrdersController@delete')->name('DeleteProviderOrder');
        Route::post('/providerorder/dialog/search', 'ProviderOrdersController@dialogSearch')->name('ProviderOrderDialogSearch');
        Route::post('/providerorder/{id}/select', 'ProviderOrdersController@select')->name('SelectProviderOrder');
        Route::post('/providerorder/{id}/loaditems', 'ProviderOrdersController@loadItems')->name('LoadItemsProviderOrder');
        Route::post('/providerorder/{id}/fresh', 'ProviderOrdersController@fresh')->name('FreshProviderOrder');
        Route::post('/provider_orders/tabledata', 'ProviderOrdersController@tableData')->name('StoreProviderOrderData');
        Route::post('/provider_orders/side_info', 'ProviderOrdersController@getPartnerSideInfo')->name('GetPartnerSideInfo');

        #Корректировки
        Route::post('/adjustment/store', 'AdjustmentController@store')->name('StoreAdjustment');// Строгое название
        Route::post('/adjustment/{id}/fresh', 'AdjustmentController@fresh')->name('FreshAdjustment');
        Route::post('/adjustment/{id}/delete', 'AdjustmentController@delete')->name('DeleteAdjustment');
        Route::post('/adjustment/tabledata', 'AdjustmentController@tableData')->name('StoreAdjustmentData');
        Route::post('/adjustment/side_info', 'AdjustmentController@getSideInfo')->name('GetPartnerSideInfo');
        Route::get('/adjustments/search', 'AdjustmentController@search')->name('SearchAdjustment');

        #Касса
        Route::get('/cash', 'CashController@index')->name('CashIndex');// Строгое название

        #Кассовые операции
        Route::get('/warrant/events', 'WarrantController@events')->name('WarrantOrderEvents');// Строгое название
        Route::middleware('requestLimit')->post('/warrant/store', 'WarrantController@store')->name('StoreWarrant');// Строгое название
        Route::post('/warrant/search', 'WarrantController@search')->name('WarrantPageSearch');
        Route::post('/warrant/{id}/delete', 'WarrantController@delete')->name('DeleteWarrant');
        Route::post('/warrant/tabledata', 'WarrantController@tableData')->name('StoreWarrantData');
        Route::post('/warrant/side_info', 'WarrantController@getSideInfo')->name('GetWarrantSideInfo');
        Route::get('/warrants', 'WarrantController@selectDialog')->name('GetWarrants');

        #Возвраты
        Route::post('/refund/store', 'RefundController@store')->name('StoreRefund');// Строгое название
        Route::post('/refund/search', 'RefundController@search')->name('RefundPageSearch');
        Route::post('/refund/{refund}/fresh', 'RefundController@fresh')->name('FreshRefund');
        Route::post('/refund/tabledata', 'RefundController@tableData')->name('StoreRefundData');
        Route::post('/refund/side_info', 'RefundController@getSideInfo')->name('GetRefundSideInfo');

        #Движение средств между кассами
        Route::post('/cashmove/store', 'MoneyMoveController@store')->name('StoreMoneyMove');// Строгое название
        Route::post('/cashmove/search', 'MoneyMoveController@search')->name('MoneyMovePageSearch');
        Route::post('/cashmove/tabledata', 'MoneyMoveController@tableData')->name('MoneyMoveData');
        Route::post('/cashmove/side_info', 'MoneyMoveController@getSideInfo')->name('MoneyMoveSideInfo');
        Route::post('/moneymove/{id}/delete', 'MoneyMoveController@delete')->name('DeleteMoneyMove');
        #Касса

        #Кассовые аппараты
        Route::post('/cashbox/new', 'CashboxController@store')->name('StoreCashbox');
        Route::post('/cashbox/{id}/delete', 'CashboxController@delete')->name('DeleteCashbox');
        Route::post('/cashbox/{id}/restore', 'CashboxController@restore')->name('RestoreCashbox');
        Route::post('/cashbox/{id}/select', 'CashboxController@select')->name('SelectCashbox');
        Route::post('/cashbox/dialog/search', 'CashboxController@dialogSearch')->name('CashboxDialogSearch');

        #Статьи движения денежных средств
        Route::post('/ddsarticle/new', 'DdsarticleController@store')->name('StoreDdsarticle');
        Route::post('/ddsarticle/{id}/delete', 'DdsarticleController@delete')->name('DeleteDdsarticle');
        Route::post('/ddsarticle/{id}/select', 'DdsarticleController@select')->name('SelectDdsarticle');
        Route::post('/ddsarticle/dialog/search', 'DdsarticleController@dialogSearch')->name('DdsarticleDialogSearch');

        #Склады
        Route::get('/store', 'StoreController@index')->name('StoreIndex'); // Строгое название
        Route::post('/store/tabledata', 'StoreController@tableData')->name('StoreTableProductData');
        Route::post('/store/new', 'StoreController@store')->name('StoreStore');
        Route::post('/store/{id}/delete', 'StoreController@delete')->name('DeleteStore');
        Route::post('/store/checkstock', 'StoreController@checkstock')->name('CheckStock');
        Route::post('/store/import', 'StoreController@import')->name('StoreImport');
        Route::post('/store/imports/{import}', 'StoreController@applyImport')->name('ApplyImport');

        #История
        Route::get('/actions', 'UserActionsController@index')->name('ActionsIndex');
        Route::post('/actions/freshPage', 'UserActionsController@freshPage')->name('ActionsFreshPage');
        Route::post('/actions/searchPartner', 'UserActionsController@searchPartner')->name('ActionsSearchPartner');

        #Сотрудники
        Route::get('/employee/resources', 'EmployeeController@resources')->name('EmployeeResources');
        Route::get('/employee/tabledata', 'EmployeeController@tabledata')->name('EmployeeTableData');
        Route::get('/employee', 'EmployeeController@index')->name('EmployeeIndex');

        #Транспорт
        Route::post('/vehicles', 'VehicleController@store')->name('StoreVehicle');
        Route::get('/models/{mark}/list', 'VehicleController@modelList');
        Route::get('/modifies/{mark}/{model}/list', 'VehicleController@modifyList');
        Route::delete('/vehicles/{vehicle}', 'VehicleController@destroy');

        #Картинки
        Route::post('/system/image_upload', 'System\ImageController@upload')->name('uploadImage');
        Route::post('/system/crop_image', 'System\ImageController@cropImage')->name('CropImage');
        //    Route::post('/remove_image', 'Stock\ImageController@remove')->name('removeImage');
        //    Route::post('/rotate_image', 'Stock\ImageController@rotateImg')->name('rotateImg');
        //    Route::post('/setindexes', 'Stock\ImageController@setIndexes')->name('setIndexes');

        #Календарь
        Route::get('/calendar', 'CalendarController@index')->name('CalendarIndex');

        #Планировщик
        Route::get('/schedule', 'ScheduleController@index')->name('ScheduleIndex');
        Route::post('/schedules/get', 'ScheduleController@getSchedules')->name('GetSchedules');
        Route::post('/schedules/store', 'ScheduleController@store')->name('StoreSchedules');

        #Роли и разрешения
        Route::get('/roles/get', 'RoleController@getRoles')->name('GetRolesList');
        Route::post('/roles/store', 'RoleController@store')->name('StoreRole');
        Route::post('/roles/assign', 'RoleController@assignRoleToUser')->name('RoleToUser');
        Route::post('/role/{id}/delete', 'RoleController@delete')->name('DeleteRole');

        #Контакты
        Route::get('/partner', 'PartnerController@index')->name('PartnerIndex');// Строгое название
        Route::post('/partner/search', 'PartnerController@search')->name('PartnerPageSearch');
        Route::post('/partner/store', 'PartnerController@store')->name('StorePartner');
        Route::post('/partner/{id}/delete', 'PartnerController@delete')->name('DeletePartner');
        Route::post('/partner/dialog/search', 'PartnerController@dialogSearch')->name('PartnerDialogSearch');
        Route::post('/partner/{partner}/select', 'PartnerController@select')->name('SelectPartner');
        Route::post('/partner/tabledata', 'PartnerController@tabledata')->name('PartnerTableData');
        Route::post('/partner/side_info', 'PartnerController@getSideInfo')->name('GetPartnerSideInfo');
        Route::post('/partner/check-phone', 'PartnerController@checkPhone')->name('checkPartnerPhone');

        #Выплаты зарплат
        Route::get('/salarypayments', 'SalaryPayments@index')->name('SalaryPaymentsIndex');// Строгое название
        Route::post('/salarypayments/tabledata', 'SalaryPaymentsController@tableData')->name('SalaryPaymentsTableData');

        #Сервисы
        Route::get('/services/{service}', 'ServiceController@show')->name('ServiceShow');
        Route::post('/services/{service}/toggle', 'ServiceController@toggle')->name('ServiceToggle');
        Route::post('/services/updateSort', 'ServiceController@updateSort')->name('ServiceUpdateSort');

        #Документы
        Route::any('/document', 'DocumentController@document')->name('Document');
        Route::post('/documents/tabledata', 'DocumentController@tableData')->name('DocumentEntranceData');
        Route::post('/documents', 'DocumentController@store')->name('DocumentStore');
        Route::get('/documents/{document}', 'DocumentController@show')->name('DocumentShow');
        Route::post('/documents/side_info', 'DocumentController@getPartnerSideInfo')->name('GetDocumentPartnerSideInfo');

        #Отчеты
        Route::get('/report', 'SmsController@index')->name('ReportIndex');// Строгое название

        #Диалоги
        Route::get('/dialog_{tag}_open', 'DialogController@openDialogByTag')->name('openDialog');

        #Системные сообщения
        Route::get('/systemMessages/load', 'SystemMessageController@load')->name('loadSystemMessages');
        Route::post('/systemMessages/read', 'SystemMessageController@read')->name('readSystemMessages');

        #SMS сообщения
        Route::post('/sms/send', 'SMSMessageController@sendsms')->name('SendSMS');

        #Штрихкоды
        Route::post('/barcode/search', 'BarcodeController@search')->name('BarcodeSearch');

        Route::post('/settings/master/store', 'SettingsController@storeFromMaster')->name('StoreFromMaster');
        Route::post('/settings/master/close', 'SettingsController@closeSettingsMaster')->name('CloseMaster');

        Route::get('/shop', 'ShopController@index')->name('ShopIndex');
        Route::post('/shop', 'ShopController@update')->name('ShopUpdate');
        Route::post('/shop/about', 'ShopController@updateAbout')->name('ShopUpdateAbout');
        Route::post('/shop/delivery', 'ShopController@updateDelivery')->name('ShopUpdateDelivery');
        Route::post('/shop/warranty', 'ShopController@updateWarranty')->name('ShopUpdateWarranty');
        Route::post('/shop/settings', 'ShopController@updateSettings')->name('ShopUpdateSettings');

        Route::post('/shop_orders/tabledata', 'ShopController@tableData')->name('ShopTableData');
        Route::post('/shop_orders/side_info', 'ShopController@getSideInfo')->name('ShopSideInfo');
        Route::post('/shop_orders/store', 'ShopController@store')->name('StoreOrder');

        Route::group(['prefix' => 'ws'], function () {
            Route::get('/check-auth', function () {
                return response()->json([
                    'auth' => Auth::check()
                ]);
            });
            Route::get('/check-sub/{channel}', function ($channel) {
                return response()->json([
                    'can' => Auth::check()
                ]);
            });
        });
    });
});

Route::get('/islogged', function () {
    return response()->json([
        'auth' => Auth::check()
    ]);
});

Route::get('/whoami', 'UserController@whoami');

Route::post('/user/get_channel', 'UserController@getChannel')->name('GetUserChannel');
Route::post('/system/auth_by_user', 'UserController@authByUser')->name('authByUser');
Route::get('/system/back_to_user', 'UserController@backToUser')->name('backToUser');

#Коморка разработчиков
Route::middleware(['web', 'auth', 'superAdmin'])->prefix('admin')->namespace('Admin')->name('Admin')->group(function () {

    Route::get('/', 'DashboardController@index')->name('Dashboard');
    Route::get('/{active_tab}/tabledata', 'DashboardController@tableData')->name('DashboardTable');

    Route::post('/companies/{company}/update', 'CompanyController@update')->name('UpdateCompany');
    Route::get('/companies/search', 'CompanyController@selectDialog')->name('SearchCompany');

    Route::post('/users/{user}/update', 'UserController@update')->name('UpdateUser');
    Route::post('/system_message/send', 'UserController@sendSystemMessageTo')->name('SendMessage');
});
