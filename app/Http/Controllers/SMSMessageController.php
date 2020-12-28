<?php

namespace App\Http\Controllers;

use App\Models\ClientOrder;
use Illuminate\Http\Request;
use App\Models\SMSMessages;
use App\Models\SMS;
use stdClass;
use Auth;

class SMSMessageController extends Controller
{
    public function sendsms(Request $request){
        //dd($request);
        if($request['type'] == 'clientOrder'){
            $smsMessage = new SMSMessages();
            $request['phone'] = str_replace(array('(', ')', ' ', '-'), '', $request['phone']);
            $smsru = new SMS(env('SMS_RU_CODE'));
            $data = new stdClass();
            $data->to = $request['phone'];
            $data->text = $request['message'];
            $data->from = 'BB-CRM';
            $data->test = 0;
            $sms = $smsru->send_one($data);
            if ($sms->status == "OK") {

                $smsMessage->partner_id = Auth::user()->partner()->first()->id;
                $smsMessage->company_id = Auth::user()->company()->first()->id;
                $smsMessage->phone = $request['phone'];
                $smsMessage->status_code = $sms->status_code;
                $smsMessage->sms_id = $sms->sms_id;
                $smsMessage->cost = $sms->cost;
                $smsMessage->ip = request()->ip();
                $smsMessage->message = $request['message'];
                $smsMessage->save();

                Auth::user()->company->decrementSmsBalance($sms->cost);

                $clientOrder = ClientOrder::owned()->where('id', $request['id'])->first();
                $clientOrder->smsMessages()->attach($smsMessage->id);

                if($request->expectsJson()){
                    return response()->json([
                        'message' => 'Сообщение отправлено',
                        'id' => $clientOrder->id,
                        'event' => 'clientOrderSMS',
                    ], 200);
                } else {
                    return redirect()->back();
                }
            } else {
                return response()->json([
                    'message' => 'SMS отправить не удалось', 'sms' => $sms], 500);
            }
        }
    }
}
