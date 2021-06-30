<?php

namespace App\Http\Controllers\System;

use App\Http\Requests\Providers\Feedback\FeedbackRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Facades\NotifyServiceFacade as Notify;

class FeedbackController extends Controller
{
    public static function sendEmail (FeedbackRequest $request)
    {
        $user = Auth::user();
        $userFio = $user->partner->outputName();
        $userPhone = $user->partner->firstActivePhoneNumber() != '' ? $user->partner->firstActivePhoneNumber() : $user->phone;
        $message = $request->text;
        $company_id = $user->company_id;

        $data = [
            'message' => $message,
            'fio' => $userFio,
            'phone' => $userPhone,
            'company_id' =>$company_id
        ];

        Notify::sendMail($data, 'providerEmail', "posta.vka@mail.ru", 'Заявка по поставщикам');

        return response()->json([
            'type' => 'success',
            'message' => 'Ваше предложение отправлено'
        ]);
    }

}
