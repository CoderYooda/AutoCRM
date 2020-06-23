<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\SystemMessage as SM;
use App\Events\SystemMessage;
use Illuminate\Support\Facades\Hash;
use Auth;

class SystemMessageController extends Controller
{
    public static function sendToAll()
    {
        $users = User::all();
        self::sendTo($users);
    }

    public static function getMessagesAside()
    {
        $messages = SM::owned()->where('viewed', 0)->orderBy('created_at', 'DESC')->get();
        return $messages;
    }

    public static function sendToOwnCompanyOthers(){
        
    }

    public static function sendToAllButOne()
    {
        $initiator = Auth::user();
        $users = User::where('id', '!=', $initiator->id)->get();
        self::sendTo($users);
    }

    private static function sendTo($users){
        foreach($users as $user){

            $system_message = new SM();
            $system_message->user_id = 1;
            $system_message->reciever_id = $user->id;
            $system_message->type = 'test';
            $system_message->message = 'Партнер обновлен';
            $system_message->save();

            event(
                new SystemMessage($system_message)
            );
        }
    }

    public function sendSystenMessageTo(Request $request)
    {
        $system_message = new SM();
        $system_message->user_id = 1;
        $system_message->reciever_id = $request->user_id;
        $system_message->type = 'test';
        $system_message->message = $request->message;
        $system_message->save();

        event(
            new SystemMessage($system_message)
        );

        return response()->json([
            'message' => 'Сообщение отправлено',
            'type' => 'success'
        ]);
    }

    public function load()
    {
        $messages = self::getMessagesAside();
        return response()->json([
            'count' => $messages->count(),
            'html' => view(env('DEFAULT_THEME', 'classic') . '.system.messages_list', compact('messages'))->render()
        ]);
    }

    public function read(Request $request)
    {
        $message = SM::owned()->where('id', $request['id'])->first();

        if($message !== null){
            $message->viewed = true;
            $message->save();
        }
//        return response()->json([
//            'count' => $messages->count(),
//            'html' => view(env('DEFAULT_THEME', 'classic') . '.system.messages_list', compact('messages'))->render()
//        ]);
    }

    public static function sendToCompany($company_id, $type, $message, $model, $pause = null)
    {
        $company = Company::where('id', $company_id)->first();
        foreach($company->members()->get() as $user){

            if($pause !== null){

                $sm = SM::where('reciever_id', $user->id)->where('kind', class_basename($model))->where('kind_id', $model->id)->orderBy('id', 'DESC')->first();

                if($sm == null || !Hash::check( class_basename($model) . $model->id . $model->updated_at, $sm->hash)){ //
                    echo 'Создаём сообщение';
                    $system_message = new SM();
                    $system_message->user_id = 1;
                    $system_message->reciever_id = $user->id;
                    $system_message->kind_id = $model->id;
                    $system_message->kind = class_basename($model);
                    $system_message->type = $type;
                    $system_message->hash = Hash::make( class_basename($model) . $model->id . $model->updated_at );
                    $system_message->message = $message;
                    $system_message->save();

                    event(
                        new SystemMessage($system_message)
                    );
                }

            } else {

                $system_message = new SM();
                $system_message->user_id = 1;
                $system_message->reciever_id = $user->id;
                $system_message->kind_id = $model->id;
                $system_message->kind = class_basename($model);
                $system_message->type = $type;
                $system_message->hash = Hash::make( class_basename($model) . $model->id . $model->updated_at );
                $system_message->message = $message;
                $system_message->save();

                event(
                    new SystemMessage($system_message)
                );
            }

        }
    }
}
