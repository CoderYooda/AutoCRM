<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class DialogController extends Controller
{
    public function openDialogByTag($tag, Request $request)
    {
        switch ($tag) {
            case 'selectSupplier':
                $dialog = SupplierController::selectSupplierDialog($request);
                break;
            case 'supplierDialog':
                $dialog = SupplierController::supplierDialog($request);
                break;
            case 'categoryDialog':
                $dialog = CategoryController::categoryDialog($request);
                break;
            case 'selectCategory':
                $dialog = CategoryController::selectCategoryDialog($request);
                break;
//            case 'editCategory':
//                $dialog = CategoryController::editCategoryDialog($request);
//                break;
            case 'productDialog':
                $dialog = ProductController::productDialog($request);
                break;
            case 'selectProduct':
                $dialog = ProductController::selectProductDialog($request);
                break;
            case 'partnerDialog':
                $dialog = PartnerController::partnerDialog($request);
                break;
            case 'selectPartner':
                $dialog = PartnerController::selectPartnerDialog($request);
                break;
            case 'selectCashbox':
                $dialog = CashboxController::selectCashboxDialog($request);
                break;
            case 'selectDdsarticle':
                $dialog = DdsarticleController::selectDdsarticleDialog($request);
                break;
            case 'cashboxDialog':
                $dialog = CashboxController::cashboxDialog($request);
                break;
            case 'moneymoveDialog':
                $dialog = MoneyMoveController::moneymoveDialog($request);
                break;
            case 'createStore':
                $dialog = StoreController::addStoreDialog($request);
                break;
            case 'editStore':
                $dialog = StoreController::editStoreDialog($request);
                break;
            case 'ddsarticleDialog':
                $dialog = DdsarticleController::ddsarticleDialog($request);
                break;
            case 'entranceDialog':
                $dialog = EntranceController::entranceDialog($request);
                break;
            case 'warrantDialog':
                $dialog = WarrantController::warrantDialog($request);
                break;
            case 'barcodeDialog':
                $dialog = BarcodeController::barcodeDialog($request);
                break;
            case 'shipmentDialog':
                $dialog = ShipmentsController::shipmentDialog($request);
                break;
            case 'clientorderDialog':
                $dialog = ClientOrdersController::clientorderDialog($request);
                break;
            case 'providerorderDialog':
                $dialog = ProviderOrdersController::providerorderDialog($request);
                break;
            case 'adjustmentDialog':
                $dialog = AdjustmentController::adjustmentDialog($request);
                break;
        }

        if(!isset($dialog)){
            return response()->json(['message' => 'Диалоговое окно не может быть вызвано'], 500);
        }

        return $dialog;
    }
}
