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

        return $response['ErrorCode'] != 5;
    }

    public function message()
    {
        return 'Неправильно введены данные от Sberbank Merchant.';
    }
}
