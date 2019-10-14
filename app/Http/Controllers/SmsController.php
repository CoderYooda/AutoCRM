<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SMS;
use stdClass;
use App\Models\SmsConfirmation;
use Illuminate\Support\Facades\Validator;

class SmsController extends Controller
{
    public static function sendSMS(){
        $smsru = new SMS(env('SMS_RU_CODE'));
        $data = new stdClass();
        $data->to = '79300841648';
        $data->text = 'Код подтверждения: 150752'; // Текст сообщения
        $data->from = 'BB-CRM'; // Если у вас уже одобрен буквенный отправитель, его можно указать здесь, в противном случае будет использоваться ваш отправитель по умолчанию
        // $data->time = time() + 7*60*60; // Отложить отправку на 7 часов
        // $data->translit = 1; // Перевести все русские символы в латиницу (позволяет сэкономить на длине СМС)
        // $data->test = 1; // Позволяет выполнить запрос в тестовом режиме без реальной отправки сообщения
        // $data->partner_id = '1'; // Можно указать ваш ID партнера, если вы интегрируете код в чужую систему
        $sms = $smsru->send_one($data); // Отправка сообщения и возврат данных в переменную

        if ($sms->status == "OK") { // Запрос выполнен успешно
            dd($sms);
        } else {
            dd($sms);
        }
    }

    public function confirmate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => ['required', 'regex:/[0-9]{10}/', 'digits:11', 'unique:users']
        ]);

        if($validator->fails()){
            return response()->json([
                'validator' => $validator->errors()
            ]);
        }

        $sms = self::sendTo($request['phone']);

        return response()->json([
           'phone' =>  $request['phone'],
            'sms' => $sms
        ]);
    }

    public static function sendTo($phone)
    {
        $confirm_code = rand(10000, 99999);
        $smsru = new SMS(env('SMS_RU_CODE'));
        $data = new stdClass();
        $data->to = $phone;
        $data->text = $confirm_code;
        $data->from = 'BB-CRM';
        $data->test = 1;
        $sms = $smsru->send_one($data);
        if ($sms->status == "OK") {
            $sms_confirmation = SmsConfirmation::firstOrNew(['ip' => request()->ip()]);

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
