<?php

namespace App\Rules\Yandex;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Str;
use YandexCheckout\Client;

class CheckPaymentMethodYandex implements Rule
{
    public function passes($attribute, $value)
    {
        $client = new Client();

        $client->setAuth($value['shop_id'], $value['secret_key']);

        try {
            $client->getPaymentInfo(Str::random(36));
        }
        catch (\Exception $exception) {
            if($exception->getCode() == 401) return false;
        }

        return true;
    }

    public function message()
    {
        return 'Неправильно введены данные от Yandex Checkout.';
    }
}
