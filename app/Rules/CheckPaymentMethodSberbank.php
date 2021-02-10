<?php

namespace App\Rules;

use App\Http\Controllers\API\SberbankController;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Str;

class CheckPaymentMethodSberbank implements Rule
{
    public function passes($attribute, $value)
    {
        $api = new SberbankController($value['login'], $value['password']);

        $response = $api->getOrderStatus(Str::random(36));

        if($value['login'] != null && $value['password'] != null){
            return $response['errorCode'] != 5;
        } else {
            return true;
        }
    }

    public function message()
    {
        return 'Неправильно введены данные от Sberbank Merchant.';
    }
}
