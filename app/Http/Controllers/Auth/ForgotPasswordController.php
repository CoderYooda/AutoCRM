<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\SMS;
use App\Models\SmsConfirmation;
use Illuminate\Support\Facades\Validator;
use stdClass;
use Illuminate\Support\Facades\Hash;
//use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
//    use SendsPasswordResetEmails;

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function sendSMS(Request $request){
        $request['phone'] = self::preparePhone($request);

        $validator = $request->validate([
            'phone' => 'required|digits:11|integer',
        ]);
        

        $sms = self::sendTo($request['phone']);
        $status = 'error';
        if($sms){
            $status = 'success';
        }
        return response()->json([
            'status' => $status,
            'hash' => $sms->hash,
            'sms_id' => $sms->sms_id
        ]);
    }

    public function confirmSMS(Request $request){
        $request['phone'] = self::preparePhone($request);

        $sms_confirmation = SmsConfirmation::where('sms_id' , $request['sms_id'])->first();
        $sms_confirmation->increment('attempts');
        $status = 'error';

        if(Hash::check($request['phone'] . $request['sms_code'], $sms_confirmation->hash)){
            $status = 'success';
        }

        return response()->json([
            'status' => $status,
        ]);
    }

    public function resetForm(){
        return view('auth.passwords.reset');
    }

    public function reset(Request $request){

        $request['phone'] = self::preparePhone($request);
        $request->validate([
            'phone' => 'required|digits:11|integer',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $sms_confirmation = SmsConfirmation::where('sms_id' , $request['sms_id'])->first();

        $status = 'error';

        if(Hash::check($request['phone'] . $request['sms_code'], $sms_confirmation->hash)){
            $user = User::where('phone', $request['phone'])->first();
            if(!$user){
                $status = 'error';
            } else {
                $user->password = bcrypt($request['password']);
                $user->save();
                $status = 'success';
            }
        }
        return response()->json([
            'status' => $status,
        ]);
    }

    private function preparePhone($request){
        return str_replace(array('(', ')', ' ', '_', '-', '+'), '', $request['phone']);
    }

    private static function sendTo($phone){
        $confirm_code = rand(10000, 99999);
        $smsru = new SMS(env('SMS_RU_CODE'));
        $data = new stdClass();
        $data->to = $phone;
        $data->text = $confirm_code;
        $data->from = 'BB-CRM';
        $data->test = 0;
        $sms = $smsru->send_one($data);

        if ($sms->status == "OK") {
            $sms_confirmation = SmsConfirmation::firstOrNew(['ip' => request()->ip(),'type' => 'recover', 'phone' => $phone]);

            $sms_confirmation->phone = $phone;
            $sms_confirmation->code = $confirm_code;
            $sms_confirmation->type = 'recover';
            $sms_confirmation->hash =  bcrypt($phone . $confirm_code);
            $sms_confirmation->status = $sms->status;
            $sms_confirmation->status_code = $sms->status_code;
            $sms_confirmation->sms_id = $sms->sms_id;
            $sms_confirmation->cost = $sms->cost;
            $sms_confirmation->ip = request()->ip();

            $sms_confirmation->save();

            return $sms_confirmation;
        } else {
            return false;
        }

    }
}
