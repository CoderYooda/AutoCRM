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
            $moneymove = MoneyMoves::where('id', (int)$request['moneymove_id'])->first();
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

        $moneymove = MoneyMoves::firstOrNew(['id' => $request['id']]);

        if($moneymove->exists){
            $message = "Перемещение обновлено обновлен";
            $moneymove->out_cashbox()->first()->subtraction($moneymove->summ);
            $moneymove->in_cashbox()->first()->addition($moneymove->summ);
        } else{
            $message = "Перемещение создано";
        }

        $in_cashbox = Cashbox::owned()->where('id', $request['in_cashbox_id'])->first();
        $out_cashbox = Cashbox::owned()->where('id', $request['out_cashbox_id'])->first();


        $out_cashbox = $out_cashbox->addition($request['summ']);
        $in_cashbox = $in_cashbox->subtraction($request['summ']);

        $moneymove->fill($request->only($moneymove->fields));
        $moneymove->in_balance = $in_cashbox->balance;
        $moneymove->out_balance = $out_cashbox->balance;
        $moneymove->created_at = $request['do_date'];
        $moneymove->save();


        if($request->ajax()){
            return response()->json([
                'message' => $message,
                'event' => 'MoneymoveStored',
            ], 200);
        } else {
            return redirect()->back();
        }
    }




    public function search(Request $request){
        $content = view('cash.elements.moneymove_list_container', compact('request'))->render();
        return response()->json([
            'html' => $content,
            'target' => 'ajax-table-moneymove',
        ], 200);
    }

    public static function getMoneymoves($request)
    {
        $moneymoves = MoneyMoves::owned()
            ->orderBy('created_at', 'DESC')
//            ->where(function($q) use ($request){
//                if(isset($request['isIncoming']) && $request['isIncoming'] != 'null'){
//                    $q->where('isIncoming',   boolval ($request['isIncoming']));
//                }
//            })
            ->paginate(50);

        return $moneymoves;
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
