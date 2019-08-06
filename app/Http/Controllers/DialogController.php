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
                $dialog = ProductController::addProductCategoryDialog();
                break;
        }

        return $dialog;
    }
}
