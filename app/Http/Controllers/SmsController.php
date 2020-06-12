<?php

namespace App\Http\Controllers;

use App\Http\Requests\SmsRequest;
use Illuminate\Http\Request;
use App\Models\SMSMessages;
use App\Models\SMS;
use stdClass;
use App\Models\SmsConfirmation;
use Auth;

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
        if ($sms->status == "OK") {
            $smsMessage = new SMSMessages();
            $smsMessage->partner_id = Auth::user()->partner()->first()->id;
            $smsMessage->company_id = Auth::user()->company()->first()->id;
            $smsMessage->phone = $phone;
            $smsMessage->status_code = $sms->status_code;
            $smsMessage->sms_id = $sms->sms_id;
            $smsMessage->cost = $sms->cost;
            $smsMessage->ip = request()->ip();
            $smsMessage->message = $text;
            $smsMessage->save();

            return true;
        } else {
            return false;
        }
    }


    public function confirm(SmsRequest $request)
    {
        $sms = SmsConfirmation::where('ip', $request->ip())->where('phone', $request['phone'])->first();

        if($sms->code != null && $sms->code == $request['code']){
            $sms->attempts = $sms->attempts + 1;
            $sms->confirmed = true;
            $sms->save();
            return response()->json(['status' => 'success'],200);
        } else {
            return response()->json(['status' => 'error'],200);
        }
    }

    public static function smsConfirmed($request)
    {
        $sms = SmsConfirmation::where('ip', $request->ip())->where('phone', $request['phone'])->first();
        if($sms != null && $sms->confirmed && !$sms->isblocked){
            return true;
        } else {
            return false;
        }
    }

    public static function smsRetry($sms_id){
        $sms_confirmation = SmsConfirmation::where(['ip' => request()->ip(), 'sms_id' => $sms_id])->first();
        SmsController::sendTo($sms_confirmation->phone);
        return true;
    }

    public static function sendTo($phone)
    {
        $confirm_code = rand(10000, 99999);
        $smsru = new SMS(env('SMS_RU_CODE'));
        $data = new stdClass();
        $data->to = $phone;
        $data->text = $confirm_code;
        $data->from = 'BB-CRM';
        $data->test = 0;
        $sms = $smsru->send_one($data);
        if ($sms->status == "OK") {
            $sms_confirmation = SmsConfirmation::firstOrNew(['ip' => request()->ip(), 'phone' => $phone]);

            if ($sms_confirmation->exists) {
                $sms_confirmation->attempts = $sms_confirmation->attempts + 1;
                if ($sms_confirmation->attempts > 3) {
                    $sms_confirmation->isblocked = true;
                }
            }

            $sms_confirmation->phone = $phone;
            $sms_confirmation->code = $confirm_code;
            $sms_confirmation->status = $sms->status;
            $sms_confirmation->status_code = $sms->status_code;
            $sms_confirmation->sms_id = $sms->sms_id;
            $sms_confirmation->cost = $sms->cost;
            $sms_confirmation->ip = request()->ip();

            $sms_confirmation->save();
        }
        return $sms;
    }
}
