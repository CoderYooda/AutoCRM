<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DialogController extends Controller
{
    public function openDialogByTag($tag)
    {
        switch ($tag) {
            case 'createProduct':
                $dialog = ProductController::addProductDialog();
                break;
            case 'createProductCategory':
                $dialog = CategoryController::addCategoryDialog();
                break;
            case 'selectCategory':
                $dialog = CategoryController::selectCategoryDialog();
                break;
        }

        return $dialog;
    }
}
