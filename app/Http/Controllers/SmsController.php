<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SMS;
use stdClass;

class SmsController extends Controller
{
    public static function sendSMS(){
        $smsru = new SMS('88BBCA622-E3EC-0ED8-22AA-E72928269070');
        $data = new stdClass();
        $data->to = '79524245038';
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
}
