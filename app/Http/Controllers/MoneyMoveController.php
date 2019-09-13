<?php

namespace App\Http\Controllers;

use App\Models\Cashbox;
use App\Models\MoneyMoves;
use App\Models\Partner;
use App\Models\Warrant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class MoneyMoveController extends Controller
{

    public static function moneymoveDialog($request)
    {
        $tag = 'moneymoveDialog';

        if($request['moneymove_id']){
            $moneymove = MoneyMoves::where('id', (int)$request['warrant_id'])->first();
            $tag .= $moneymove->id;
        } else {
            $moneymove = null;
        }

        return response()->json([
            'tag' => $tag,
            'html' => view('cash.dialog.form_moneymove', compact('moneymove', 'request'))->render()
        ]);
    }

    public function store(Request $request)
    {
        $request['company_id'] = Auth::user()->company()->first()->id;
        if($request['do_date'] == null){
            $request['do_date'] = Carbon::now();
        }

        $validation = Validator::make($request->all(), self::validateRules($request));
        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $warrant = Warrant::firstOrNew(['id' => $request['id']]);

        if($warrant->exists){
            $message = "Ордер обновлен";
            //$correct_summ = doubleval($warrant->summ) - doubleval($request['summ']);

            if($warrant->isIncoming){
                $warrant->partner()->first()->addition($warrant->summ);
                $warrant->cashbox()->first()->subtraction($warrant->summ);
            } else{
                $warrant->partner()->first()->subtraction($warrant->summ);
                $warrant->cashbox()->first()->addition($warrant->summ);
            }
        } else{
            $message = "Ордер создан";
        }

        $cashbox = Cashbox::owned()->where('id', $request['cashbox_id'])->first();
        $partner = Partner::owned()->where('id', $request['partner_id'])->first();

        if($request['isIncoming']){
            $cashbox = $cashbox->addition($request['summ']);
            $partner = $partner->subtraction($request['summ']);
        } else{
            $cashbox = $cashbox->subtraction($request['summ']);
            $partner = $partner->addition($request['summ']);
        }

        $warrant->fill($request->only($warrant->fields));
        $warrant->balance = $cashbox->balance;
        $warrant->save();
        $warrant->created_at = $request['do_date'];
        $warrant->save();


        if($request->ajax()){
            return response()->json([
                'message' => $message,
                'event' => 'WarrantStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }




    public function search(Request $request){
        $content = view('cash.elements.moneymove_list_container', compact('request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-warrant',
        ], 200);
    }

    private static function validateRules($request)
    {
        $rules = null;
        $rules = [
            'company_id' => ['required','exists:companies,id'],
            'in_cashbox_id' => ['required','exists:cashboxes,id', 'different:out_cashbox_id'],
            'out_cashbox_id' => ['required','exists:cashboxes,id', 'different:in_cashbox_id'],
            'summ' => ['required', 'integer', 'min:0', 'max:100000000'],

        ];
        return $rules;
    }
}
