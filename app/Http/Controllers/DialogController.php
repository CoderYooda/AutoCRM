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
                $dialog = SupplierController::addSupplierDialog($request);
                break;
            case 'createCategory':
                $dialog = CategoryController::addCategoryDialog($request);
                break;
            case 'editCategory':
                $dialog = CategoryController::editCategoryDialog($request);
                break;
            case 'productDialog':
                $dialog = ProductController::productDialog($request);
                break;
//            case 'editProduct':
//                $dialog = ProductController::editProductDialog($request);
//                break;
            case 'selectProduct':
                $dialog = ProductController::selectProductDialog($request);
                break;
            case 'selectCategory':
                $dialog = CategoryController::selectCategoryDialog($request);
                break;
//            case (preg_match('/addPartner/', $tag) ? true : false):
//                $dialog = PartnerController::addPartnerDialog($request);
//                break;
            case 'partnerDialog':
                $dialog = PartnerController::partnerDialog($request);
                break;
            case 'selectPartner':
                $dialog = PartnerController::selectPartnerDialog($request);
                break;
            case 'selectCashbox':
                $dialog = CashboxController::selectCashboxDialog($request);
                break;
            case 'cashboxDialog':
                $dialog = CashboxController::cashboxDialog($request);
                break;
            case 'createStore':
                $dialog = StoreController::addStoreDialog($request);
                break;
            case 'editStore':
                $dialog = StoreController::editStoreDialog($request);
                break;
            case 'createDdsarticle':
                $dialog = DdsarticleController::addDdsarticleDialog($request);
                break;
            case 'editDdsarticle':
                $dialog = DdsarticleController::editDdsarticleDialog($request);
                break;
            case 'entranceDialog':
                $dialog = EntranceController::entranceDialog($request);
                break;
            case 'warrantDialog':
                $dialog = WarrantController::warrantDialog($request);
                break;
        }

        if(!isset($dialog)){
            return response()->json(['message' => 'Диалоговое окно не может быть вызвано'], 500);
        }

        return $dialog;
    }
}
