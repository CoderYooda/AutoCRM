<?php

namespace App\Http\Controllers;

use App\Models\Cashbox;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;

class CashboxController extends Controller
{
    public static function addCashboxDialog($request)
    {
        return response()->json(['tag' => 'createCashbox', 'html' => view('settings.dialog.form_cashbox', compact('request'))->render()]);
    }

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

        if($request->ajax()){
            return response()->json([
                'message' => $message,
                'container' => 'ajax-table',
                'redirect' => route('SettingsIndex', ['active_tab' => 'cashbox']),
                'html' => $content]);
        } else {
            return redirect()->back();
        }
    }

    public static function editCashboxDialog($request)
    {
        if($request['params']){
            $id = (int)$request['id'];
        } else {
            abort(404);
        }

        $cashbox = Cashbox::where('id', $id)->first();

        return response()->json(['tag' => 'editCashbox'.$cashbox->id, 'html' => view('settings.dialog.form_cashbox', compact('cashbox'))->render()]);
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

    public static function getCashboxes($request)
    {
        return Cashbox::where('company_id', Auth::user()->id)->get();
    }

}
