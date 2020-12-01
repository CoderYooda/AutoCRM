<?php

namespace App\Rules\Shop;

use App\Http\Controllers\API\TinkoffMerchantAPI;
use Illuminate\Contracts\Validation\Rule;

class CheckPaymentMethodTinkoff implements Rule
{
    public function passes($attribute, $value)
    {
        $terminal_key = $value['terminal_key'];
        $secret_key = $value['secret_key'];

        $api = new TinkoffMerchantAPI($terminal_key, $secret_key);

        $params = [
            'PaymentId' => 2304882
        ];

        $response = $api->getState($params);

        $response = json_decode($response);

        return $response->ErrorCode != 9999;
    }

    public function message()
    {
        return 'Неправильно введены данные от Tinkoff банка.';
    }
}
