<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashboxRequest;
use App\Models\Cashbox;
use Illuminate\Http\Request;
use Auth;
use App\Http\Controllers\UserActionsController as UA;
use Illuminate\Support\Facades\Gate;

class CashboxController extends Controller
{
    public function store(CashboxRequest $request)
    {
        $cashbox = Cashbox::firstOrNew(['id' => (int)$request['id']]);

        if($cashbox->exists){
            $message = 'Касса обновлена';
            $wasExisted = true;
        } else {
            $cashbox->manager_id = Auth::user()->partner()->first()->id;
            $cashbox->balance = 0;
            $message = 'Касса создана';
            $wasExisted = false;
        }

        $cashbox->fill($request->all());
        $cashbox->company_id = Auth::user()->company()->first()->id;
        $cashbox->save();


        $cashboxes = self::getCashboxes($request);

        UA::makeUserAction($cashbox, $wasExisted ? 'fresh' : 'create');

        $content = view(env('DEFAULT_THEME', 'classic') . '.settings.cashbox', compact('cashboxes', 'request'))->render();

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

        $content = view(env('DEFAULT_THEME', 'classic') . '.cashbox.dialog.select_cashbox_inner', compact('cashboxes', 'request'))->render();
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
            'html' => view(env('DEFAULT_THEME', 'classic') . '.cashbox.dialog.form_cashbox', compact('cashbox', 'request'))->render()
        ]);
    }

    public static function selectCashboxDialog($request)
    {
        $cashboxes = Cashbox::owned()->orderBy('id', 'DESC')->paginate(12);
        return response()->json([
            'tag' => 'selectCashboxDialog',
            'html' => view(env('DEFAULT_THEME', 'classic') . '.cashbox.dialog.select_cashbox', compact('cashboxes', 'request'))->render()
        ]);
    }

    public function delete($id, Request $request)
    {
        if(!Gate::allows('Редактировать настройки')){
            return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
        }
        $returnIds = null;
        if($id == 'array'){
            $cashboxes = Cashbox::whereIn('id', $request['ids'])->get();
            $this->message = 'Кассы удалены';
            $returnIds = $cashboxes->pluck('id');
            foreach($cashboxes as $cashbox){
                $this->status = 200;
                if($cashbox->company()->first()->id != Auth::user()->company()->first()->id){
                    $this->message = 'Вам не разрешено удалять эту кассу';
                    $this->status = 422;
                }
                if($this->status == 200){
                    if(!$cashbox->delete()){
                        $this->message = 'Ошибка зависимотей. Обратитесь к администратору';
                        $this->status = 500;
                    }
                }
                UA::makeUserAction($cashbox, 'delete');
            }
        } else {
            $cashbox = Cashbox::where('id', $id)->first();
            $this->message = 'Касса удалена';
            $returnIds = $cashbox->id;
            $this->status = 200;
            if($cashbox->company()->first()->id != Auth::user()->company()->first()->id){
                $this->message = 'Вам не разрешено удалять эту кассу';
                $this->status = 422;
            }
            if($this->status == 200){
                if(!$cashbox->delete()){
                    $this->message = 'Ошибка зависимотей. Обратитесь к администратору';
                    $this->status = 500;
                }
            }
            UA::makeUserAction($cashbox, 'delete');
        }

        return response()->json([
            'id' => $returnIds,
            'message' => $this->message
        ], $this->status);
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
