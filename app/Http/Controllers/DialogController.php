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
            case (preg_match('/createProduct/', $tag) ? true : false):
                $dialog = ProductController::addProductDialog($request);
                break;
            case 'editProduct':
                $dialog = ProductController::editProductDialog($request);
                break;
            case 'selectProduct':
                $dialog = ProductController::selectProductDialog($request);
                break;
            case 'selectCategory':
                $dialog = CategoryController::selectCategoryDialog($request);
                break;
            case (preg_match('/addPartner/', $tag) ? true : false):
                $dialog = PartnerController::addPartnerDialog($request);
                break;
            case 'editPartner':
                $dialog = PartnerController::editPartnerDialog($request);
                break;
            case 'selectPartner':
                $dialog = PartnerController::selectPartnerDialog($request);
                break;
            case 'createCashbox':
                $dialog = CashboxController::addCashboxDialog($request);
                break;
            case 'editCashbox':
                $dialog = CashboxController::editCashboxDialog($request);
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
            case 'createEntrance':
                $dialog = EntranceController::addEntranceDialog($request);
                break;
            case 'editEntrance':
                $dialog = EntranceController::editEntranceDialog($request);
                break;


        }

        if(!isset($dialog)){
            return response()->json(['message' => 'Диалоговое окно не может быть вызвано'], 500);
        }

        return $dialog;
    }
}
