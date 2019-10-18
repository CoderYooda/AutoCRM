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

    public static function addSupplierDialog($request)
    {
        $suppliers = Supplier::owned()->get();
        return response()->json(['tag' => 'selectSupplier', 'html' => view('supplier.dialog.list_suppliers', compact('suppliers'))->render()]);
    }

    public static function silent_store($request)// Сохранение в автоматическом режиме, входные данные должны быть 100% достоверными
    {
        $supplier = Supplier::firstOrNew(['name' => $request['new_supplier_name'], 'company_id' => Auth::user()->company()->first()->id]);
        $supplier->name = $request['new_supplier_name'];
        $supplier->company_id = Auth::user()->company()->first()->id;
        $supplier->save();
        return $supplier;
    }
}
