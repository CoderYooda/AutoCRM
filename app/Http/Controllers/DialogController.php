<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\API\ProviderStoreController;
use App\Models\Supplier;
use App\Services\ProviderService\Providers;
use Illuminate\Http\Request;
use \App\Http\Controllers\Admin\UserController;

class DialogController extends Controller
{
    public function openDialogByTag($tag, Request $request)
    {
        $dialogs = [

            //Admin
            'selectCompany'             => [CompanyController::class, 'selectDialog'],
            'companyDialog'             => [CompanyController::class, 'dialog'],
            'userDialog'                => [UserController::class, 'dialog'],
            //Price
            'priceDialog'               => [PriceController::class, 'dialog'],
            //Order
            'orderDialog'               => [OrderController::class, 'dialog'],
            //Warrant
            'warrantDialog'             => [WarrantController::class, 'warrantDialog'],
            'selectWarrant'             => [WarrantController::class, 'selectDialog'],
            //ClientOrder
            'selectClientOrder'         => [ClientOrdersController::class, 'selectDialog'],
            'clientorderDialog'         => [ClientOrdersController::class, 'clientorderDialog'],
            //Document
            'documentDialog'            => [DocumentController::class, 'dialog'],
            //Cart
            'ProviderCartDialog'        => [ProviderStoreController::class, 'providerCartDialog'],
            //Supplier
            'selectSupplier'            => [SupplierController::class, 'selectSupplierDialog'],
            'supplierDialog'            => [SupplierController::class, 'supplierDialog'],
            //Cheque
            'chequeDialog'              => [ProductController::class, 'chequeDialog'],
            //Category
            'categoryDialog'            => [CategoryController::class, 'categoryDialog'],
            'selectCategory'            => [CategoryController::class, 'selectCategoryDialog'],
            //Product
            'productDialog'             => [ProductController::class, 'productDialog'],
            'selectProduct'             => [ProductController::class, 'selectProductDialog'],
            //Partner
            'partnerDialog'             => [PartnerController::class, 'partnerDialog'],
            'selectPartner'             => [PartnerController::class, 'selectPartnerDialog'],
            //Cashbox
            'selectCashbox'             => [CashboxController::class, 'selectCashboxDialog'],
            'cashboxDialog'             => [CashboxController::class, 'cashboxDialog'],
            //Ddsarticle
            'selectDdsarticle'          => [DdsarticleController::class, 'selectDdsarticleDialog'],
            'ddsarticleDialog'          => [DdsarticleController::class, 'ddsarticleDialog'],
            //MoneyMove
            'moneymoveDialog'           => [MoneyMoveController::class, 'moneymoveDialog'],
            //Store
            'storeDialog'               => [StoreController::class, 'storeDialog'],
            'storeImportDialog'         => [StoreController::class, 'storeImportDialog'],
            //Entrance
            'entranceDialog'            => [EntranceController::class, 'entranceDialog'],
            'selectEntranceDialog'      => [EntranceController::class, 'selectEntranceDialog'],
            'entranceRefundDialog'      => [EntranceRefundController::class, 'entranceRefundDialog'],
            //Barcode
            'barcodeDialog'             => [BarcodeController::class, 'barcodeDialog'],
            //Shipment
            'selectShipment'            => [ShipmentController::class, 'selectShipmentDialog'],
            'shipmentDialog'            => [ShipmentController::class, 'shipmentDialog'],
            //Refund
            'refundDialog'              => [RefundController::class, 'refundDialog'],
            //ProviderOrder
            'providerOrderDialog'       => [ProviderOrdersController::class, 'providerorderDialog'],
            'selectProviderOrderDialog' => [ProviderOrdersController::class, 'selectProviderOrderDialog'],
            //Adjustment
            'adjustmentDialog'          => [AdjustmentController::class, 'adjustmentDialog'],
            //Schedule
            'scheduletemplateDialog'    => [ScheduleController::class, 'scheduleTemplateDialog'],
            //Role
            'roleDialog'                => [RoleController::class, 'roleDialog'],
            //Vehicle
            'vehicleDialog'             => [VehicleController::class, 'vehicleDialog'],
            //Salary (зарплаты)
            'salarySchemaDialog'        => [SalarySchemaController::class, 'salarySchemaDialog'],

            //Referal System
            'referalPartnerDialog'      => [ReferalSystemController::class, 'referalPartnerDialog'],

            //todo написать контроллер для модалки у поставщиков
            //Provider
            'providerDialog'            => [SettingsController::class, 'providerDialog'],
        ];

        if (!in_array($tag, array_keys($dialogs))) {
            return response()->json(['message' => 'Диалоговое окно не может быть вызвано'], 500);
        }

        $class = $dialogs[$tag][0];
        $method = $dialogs[$tag][1];

        return $class::$method($request);
    }
}
