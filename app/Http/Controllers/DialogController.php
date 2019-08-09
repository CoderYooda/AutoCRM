<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DialogController extends Controller
{
    public function openDialogByTag($tag)
    {
        switch ($tag) {
            case 'createCategory':
                $dialog = CategoryController::addCategoryDialog();
                break;
            case 'editCategory':
                $dialog = CategoryController::editCategoryDialog();
                break;
            case (preg_match('/createProduct/', $tag) ? true : false):
                $dialog = ProductController::addProductDialog();
                break;
            case (preg_match('/editProduct/', $tag) ? true : false):
                $id = explode('=', $tag)[1];
                $dialog = ProductController::editProductDialog($id);
                break;
            case 'selectCategory':
                $dialog = CategoryController::selectCategoryDialog();
                break;
        }

        return $dialog;
    }
}
