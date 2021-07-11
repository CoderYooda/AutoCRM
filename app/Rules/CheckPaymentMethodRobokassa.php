<?php

namespace App\Rules;

use Idma\Robokassa\Payment;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\Rule;

class CheckPaymentMethodRobokassa implements Rule
{
    public function passes($attribute, $value)
    {
//        $payment = new Payment($value['login'], $value['first_password'], $value['second_password']);
//
//        $url = $payment
//            ->setEmail('test@mail.ru')
//            ->setInvoiceId(rand(9999933,99329999))
//            ->setDescription('Test payment')
//            ->setSum('100.0')
//            ->getPaymentUrl();
//
//        $urlContent = file_get_contents($url);
//
//        //Проверяем, появился ли логин на url, если да, то заказ норм создан, пропускаем
//        return Str::contains($urlContent, $value['login']);

        return true;
    }

    public function message()
    {
        return 'Неправильно введены данные от Robokassa.';
    }
}
