<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class SupplierController extends Controller
{
    public function _construct(){
        $status = 500;
        $message = 'Внутренняя ощибка сервера';
    }

    public static function selectSupplierDialog($request)
    {
        $suppliers = Supplier::owned()->orderBy('name', 'DESC')->get();
        return response()->json([
            'tag' => 'selectSupplierDialog',
            'html' => view('supplier.dialog.list_suppliers', compact('suppliers', 'request'))->render()
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
            'html' => view('supplier.dialog.form_supplier', compact('supplier', 'request'))->render()
        ]);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:3', 'string', 'max:120'],
        ]);

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $supplier = Supplier::firstOrNew(['id' => (int)$request['id']]);
        $supplier->fill($request->all());
        $supplier->company_id = Auth::user()->company()->first()->id;
        $supplier->save();

        if($request->expectsJson()){
            return response()->json([
                'message' => 'Производитель сохранен',
                'event' => 'SupplierStored',
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

        $content = view('supplier.dialog.list_suppliers_inner', compact('suppliers', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
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
