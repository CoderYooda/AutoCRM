<?php

namespace App\Http\Controllers;

use App\Models\Cashbox;
use App\Models\Warrant;
use Illuminate\Http\Request;
use Auth;

class WarrantController extends Controller
{
    public static function warrantDialog($request)
    {
        $tag = 'warrantDialog';

        if($request['warrant_id']){
            $tag .= $request['warrant_id'];
            $partner = Warrant::where('id', (int)$request['warrant_id'])->first();
        } else {
            $partner = null;
        }
//
//        if($request['category_select']){
//            $category_select = (int)$request['category_select'];
//        } else {
//            $category_select = 3;
//        }

        //$category = Category::where('id', $category_select)->first();

        $cashboxes = Cashbox::owned()->get();

        return response()->json([
            'tag' => $tag,
            'html' => view('cash.dialog.form_warrant', compact('partner', 'cashboxes', 'request'))->render()
        ]);
    }

    public function store(Request $request)
    {
        dd($request);

//        $request['company_id'] = Auth::user()->company()->first()->id;
//
//        $validation = Validator::make($request->all(), self::validateRules($request));
//
//        if($validation->fails()){
//            $this->status = 422;
//            if($request->ajax()){
//                return response()->json(['messages' => $validation->errors()], $this->status);
//            }
//        }
//        $partner = Partner::firstOrNew(['id' => $request['id']]);
//        if($partner->exists){
//            $message = "Контрагент обновлен";
//        } else{
//            $message = "Контрагент создан";
//        }
//        $partner->fill($request->only($partner->fields));
//        if(!$request['isfl']){
//            $partner->fio = $request['ur_fio'];
//        }
//        $partner->user_id = null;
//        $partner->save();
//        $phones = PhoneController::upsertPhones($request);
//        PassportController::upsertPassport($request, $partner);
////        $car = CarController::upsertPassport($request);
//        $partner->phones()->sync($phones->pluck('id'));
//        //$partners = self::getPartners($request);
//        //$categories = CategoryController::getCategories($request, 'partner');
//
//        //$content = view('partner.elements.list_container', compact('partners', 'categories', 'request'))->render();
//
//        if($request->ajax()){
//            return response()->json([
//                'message' => $message,
//                //'container' => 'ajax-table-partner',
//                //'redirect' => route('PartnerIndex', ['category_id' => $partner->category()->first()->id, 'serach' => $request['search']]),
//                'event' => 'PartnerStored',
//                //'html' => $content
//            ], 200);
//        } else {
//            return redirect()->back();
        //}
    }
}
