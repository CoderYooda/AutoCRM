<?php

namespace App\Http\Controllers\Shop;

use App\Models\SMS;
use App\Models\SMSMessages;
use App\Http\Controllers\Controller;
use stdClass;

class SmsController extends Controller
{
    public static function sendSMS($phone, $text)
    {
        $smsru = new SMS(env('SMS_RU_CODE'));
        $data = new stdClass();
        $data->to = $phone;
        $data->text = $text;
        $data->from = 'BB-CRM';
        $data->test = 0;
        $sms = $smsru->send_one($data);
        return $sms->status == "OK";

//            $smsMessage = new SMSMessages();
//            $smsMessage->partner_id = Auth::user()->partner->id;
//            $smsMessage->company_id = Auth::user()->company_id;
//            $smsMessage->phone = $phone;
//            $smsMessage->status_code = $sms->status_code;
//            $smsMessage->sms_id = $sms->sms_id;
//            $smsMessage->cost = $sms->cost;
//            $smsMessage->ip = request()->ip();
//            $smsMessage->message = $text;
//            $smsMessage->save();
    }
}
