<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\ProviderStoreController;
use App\Models\Supplier;
use App\Services\ProviderService\Providers;
use Illuminate\Http\Request;

class DialogController extends Controller
{
    public function openDialogByTag($tag, Request $request)
    {
        switch ($tag) {
            case 'ProviderCartDialog':
                $dialog = ProviderStoreController::ProviderCartDialog($request);#
                break;
            case 'selectSupplier':
                $dialog = SupplierController::selectSupplierDialog($request);#
                break;
            case 'chequeDialog':
                $dialog = ProductController::chequeDialog($request);
                break;
            case 'supplierDialog':
                $dialog = SupplierController::supplierDialog($request);#
                break;
            case 'categoryDialog':
                $dialog = CategoryController::categoryDialog($request);#
                break;
            case 'selectCategory':
                $dialog = CategoryController::selectCategoryDialog($request);#
                break;
            case 'productDialog':
                $dialog = ProductController::productDialog($request);#
                break;
            case 'selectProduct':
                $dialog = ProductController::selectProductDialog($request);#
                break;
            case 'partnerDialog':
                $dialog = PartnerController::partnerDialog($request);#
                break;
            case 'selectPartner':
                $dialog = PartnerController::selectPartnerDialog($request);#
                break;
            case 'selectCashbox':
                $dialog = CashboxController::selectCashboxDialog($request);#
                break;
            case 'selectDdsarticle':
                $dialog = DdsarticleController::selectDdsarticleDialog($request); #
                break;
            case 'cashboxDialog':
                $dialog = CashboxController::cashboxDialog($request);#
                break;
            case 'moneymoveDialog':
                $dialog = MoneyMoveController::moneymoveDialog($request);#
                break;
            case 'storeDialog':
                $dialog = StoreController::storeDialog($request);  //////
                break;
            case 'storeImportDialog':
                $dialog = StoreController::storeImportDialog($request);  //////
                break;
            case 'ddsarticleDialog':
                $dialog = DdsarticleController::ddsarticleDialog($request); #
                break;
            case 'entranceDialog':
                $dialog = EntranceController::entranceDialog($request); #
                break;
            case 'selectEntranceDialog':
                $dialog = EntranceController::selectEntranceDialog($request); /////
                break;
            case 'entranceRefundDialog':
                $dialog = EntranceRefundController::entranceRefundDialog($request); #
                break;
            case 'warrantDialog':
                $dialog = WarrantController::warrantDialog($request); #
                break;
            case 'barcodeDialog':
                $dialog = BarcodeController::barcodeDialog($request); /////
                break;
            case 'selectShipment':
                $dialog = ShipmentController::selectShipmentDialog($request); /////
                break;
            case 'shipmentDialog':
                $dialog = ShipmentController::shipmentDialog($request); #
                break;
            case 'clientorderDialog':
                $dialog = ClientOrdersController::clientorderDialog($request); #
                break;
//            case 'selectTransactionDialog':
//                $dialog = TransactionController::selectTransactionDialog($request); #
//                break;
            case 'refundDialog':
                $dialog = RefundController::refundDialog($request); #
                break;
            case 'providerorderDialog':
                $dialog = ProviderOrdersController::providerorderDialog($request); #
                break;
            case 'selectProviderOrderDialog':
                $dialog = ProviderOrdersController::selectProviderOrderDialog($request); #
                break;
            case 'adjustmentDialog':
                $dialog = AdjustmentController::adjustmentDialog($request); #
                break;
            case 'scheduletemplateDialog':
                $dialog = ScheduleController::scheduleTemplateDialog($request); #
                break;
            case 'roleDialog':
                $dialog = RoleController::roleDialog($request); #
                break;
            case 'vehicleDialog':
                $dialog = VehicleController::vehicleDialog($request); #
                break;
        }

        if(!isset($dialog)){
            return response()->json(['message' => 'Диалоговое окно не может быть вызвано'], 500);
        }

        return $dialog;
    }
}
