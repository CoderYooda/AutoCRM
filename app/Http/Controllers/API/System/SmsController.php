<?php

namespace App\Http\Controllers\API\System;

use App\Models\SmsConfirmation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SmsController extends Controller
{
    public static function confirmSms($request)
    {
        $sms = SmsConfirmation::where('ip', $request->ip())->where('phone', $request['phone'])->first();
        if($sms && $sms->code != null && $sms->code == $request['sms_code']){
            $sms->attempts = 0;
            $sms->isblocked = 0;
            $sms->confirmed = true;
            $sms->save();
            return true;
        } else {
            return false;
        }
    }
}
