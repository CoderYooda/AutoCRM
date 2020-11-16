<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use App\Models\VehicleMark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Auth;

class SupplierController extends Controller
{
    /** @var Supplier $supplier */
    public static $supplier = null;

    public function _construct(){
        $status = 500;
        $message = 'Внутренняя ощибка сервера';
    }

    public static function selectSupplierDialog($request)
    {
        $suppliers = Supplier::owned()->orderBy('name', 'DESC')->get();
        return response()->json([
            'tag' => 'selectSupplierDialog',
            'html' => view(get_template() . '.supplier.dialog.list_suppliers', compact('suppliers', 'request'))->render()
        ]);
    }

    public function select($id)
    {
        $supplier = Supplier::owned()->where('id', $id)->first();
        if(!$supplier){
            return response()->json([
                'message' => 'Производитель не найден, возможно он был удалён',
            ], 422);
        }
        return response()->json([
            'id' => $supplier->id,
            'name' => $supplier->name
        ]);
    }

    public static function supplierDialog($request)
    {
        $tag = 'supplierDialog';

        $supplier = Supplier::owned()->where('id', $request['id'])->first();
        return response()->json([
            'tag' => $tag,
            'html' => view(get_template() . '.supplier.dialog.form_supplier', compact('supplier', 'request'))->render()
        ]);
    }

    public function store(SupplierRequest $request)
    {
        $supplier_name = strtoupper($request['name']); //В верхний регистр
        $supplier_name = str_replace(' ', '', $supplier_name); //Удаляем пробелы

        $manufacturer = VehicleMark::where('name', $supplier_name)->first();

        self::$supplier = Supplier::updateOrCreate(['name' => $supplier_name], [
            'name' => $supplier_name,
            'company_id' => Auth::user()->company_id
        ]);

        if($request->expectsJson()){
            return response()->json([
                'message' => 'Производитель сохранен',
                'event' => 'SupplierStored'
            ]);
        } else {
            return redirect()->back();
        }
    }

    public function dialogSearch(Request $request)
    {
        $suppliers = Supplier::owned()
            ->where(function($q) use ($request){
                $q->where('name', 'LIKE', '%' . $request['string'] .'%');
            })
            ->orderBy('name', 'DESC')->limit(10)->get();

        $content = view(get_template() . '.supplier.dialog.list_suppliers_inner', compact('suppliers', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
    }

    public static function silent_store(Request $request)// Сохранение в автоматическом режиме, входные данные должны быть 100% достоверными
    {
        $supplier_name = strtoupper($request['new_supplier_name']); //В верхний регистр
        $supplier_name = str_replace(' ', '', $supplier_name); //Удаляем пробелы

        $manufacturer = VehicleMark::where('name', $supplier_name)->first();

        $supplier = Supplier::firstOrCreate([
            'name' => $supplier_name,
            'company_id' => Auth::user()->company_id
        ]);

        return $supplier;
    }
}
