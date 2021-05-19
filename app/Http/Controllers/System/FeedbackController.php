<?php

namespace App\Http\Controllers\System;

use App\Http\Requests\Providers\Feedback\FeedbackRequest;
use App\Mail\Provider\ProviderEmail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class FeedbackController extends Controller
{
    public static function sendEmail (FeedbackRequest $request) {

        $data = [];

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

        $users = ["posta.vka@mail.ru"];

        Mail::to($users)->send(new ProviderEmail($data));

        return response()->json([
            'type' => 'success',
            'message' => 'Ваше предложение отправлено'
        ]);
    }

}
