<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\SystemMessage as SM;
use App\Events\SystemMessage;
use Auth;

class SystemMessageController extends Controller
{
    public static function sendToAll()
    {
        $users = User::all();
        self::sendTo($users);
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

    public static function sendToCompany($company_id, $type, $message)
    {
        $company = Company::where('id', $company_id)->first();
        foreach($company->members()->get() as $user){
            $system_message = new SM();
            $system_message->user_id = 1;
            $system_message->reciever_id = $user->id;
            $system_message->type = $type;
            $system_message->message = $message;
            $system_message->save();

            event(
                new SystemMessage($system_message)
            );
        }
    }
}
