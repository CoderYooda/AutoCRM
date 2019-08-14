<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Auth;

class SupplierController extends Controller
{
    public function _construct(){
        $status = 500;
        $message = 'Внутренняя ощибка сервера';
    }

    public static function addSupplierDialog()
    {
        $suppliers = Supplier::where('company_id', Auth::user()->company()->first()->id)->get();
        return response()->json(['html' => view('supplier.dialog.list_suppliers', compact('suppliers'))->render()]);
    }
}
