<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use App\Models\VehicleMark;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class SupplierController extends Controller
{

    public function get(Request $request)
    {
        $suppliers = Supplier::owned()
            ->when(isset($request->search) && $request->search != "", function ($q) use($request) {
                $q->where(function($q) use ($request){
                    $q->where('name', 'LIKE', '%' . $request['search'] .'%');
                });
            })
            ->orderBy('name', 'DESC')->limit(50)->get();

        return $suppliers;
    }
    public function store(SupplierRequest $request)
    {
        $supplier_name = strtoupper($request['name']);
        $supplier_name = str_replace(' ', '', $supplier_name);

        $supplier = new Supplier();
        $supplier->name = $supplier_name;
        $supplier->company_id = Auth::user()->company_id;
        $supplier->save();

        return response()->json([
            'message' => 'Производитель сохранен',
            'event' => 'SupplierStored'
        ]);
    }
}
