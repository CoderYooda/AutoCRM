<?php

namespace App\Http\Controllers;

use App\Models\Cashbox;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;

class CashboxController extends Controller
{
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:3', 'string', 'max:255'],
        ]);

        if($validation->fails()){
            $this->status = 422;
            if($request->ajax()){
                return response()->json(['messages' => $validation->errors()], $this->status);
            }
        }

        $cashbox = Cashbox::firstOrNew(['id' => (int)$request['id']]);
        if($cashbox->exists){
            $message = 'Касса обновлена';
        } else {
            $cashbox->balance = 0;
            $message = 'Касса создана';
        }
        $cashbox->fill($request->all());
        $cashbox->company_id = Auth::user()->company()->first()->id;
        $cashbox->save();



        $cashboxes = self::getCashboxes($request);

        $content = view('settings.cashbox', compact('cashboxes', 'request'))->render();

        if($request->expectsJson()){
            return response()->json([
                'message' => $message,
                //'container' => 'ajax-table',
                'event' => 'CashboxStored'
                //'html' => $content
                ]);
        } else {
            return redirect()->back();
        }
    }

    public function dialogSearch(Request $request){
        $cashboxes = Cashbox::owned()->where('name', 'LIKE', '%' . $request['string'] .'%')
            ->orderBy('id', 'DESC')
            ->paginate(12);

        $content = view('settings.dialog.select_cashbox_inner', compact('cashboxes', 'request'))->render();
        return response()->json([
            'html' => $content
        ], 200);
    }

    public static function cashboxDialog($request)
    {
        $cashbox = null;
        if($request['params']){
            $id = (int)$request['cashbox_id'];
            $cashbox = Cashbox::owned()->where('id', $id)->first();
            $tag = 'cashboxDialog'.$cashbox->id;
        } else {
            $tag = 'cashboxDialog';
        }
        return response()->json([
            'tag' => $tag,
            'html' => view('settings.dialog.form_cashbox', compact('cashbox', 'request'))->render()
        ]);
    }

    public static function selectCashboxDialog($request)
    {
        $cashboxes = Cashbox::owned()->orderBy('id', 'DESC')->paginate(12);
        return response()->json([
            'tag' => 'selectCashboxDialog',
            'html' => view('settings.dialog.select_cashbox', compact('cashboxes', 'request'))->render()
        ]);
    }

    public function delete($id)
    {
        $cashbox = Cashbox::where('id', $id)->first();
        $message = 'Касса удалена';
        $status = 200;
        if($cashbox->company()->first()->id != Auth::user()->company()->first()->id){
            $message = 'Вам не разрешено удалять эту кассу';
            $status = 422;
        }
        if($status == 200){
            if(!$cashbox->delete()){
                $message = 'Ошибка зависимотей. Обратитесь к администратору';
                $status = 500;
            }
        }
        return response()->json(['id' => $cashbox->id, 'message' => $message], $status);
    }

    public function select($id){
        $cashbox = Cashbox::where('id', $id)->first();
        if(!$cashbox){
            return response()->json([
                'message' => 'Кассовый аппарат не найден, возможно он был удалён',
            ], 422);
        }
        return response()->json([
            'id' => $cashbox->id,
            'name' => $cashbox->name
        ]);
    }


    public static function getCashboxes($request)
    {
        return Cashbox::where('company_id', Auth::user()->id)->orderBy('id', 'DESC')->get();
    }

}
