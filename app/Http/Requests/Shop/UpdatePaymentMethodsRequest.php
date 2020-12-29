<?php

namespace App\Http\Requests\Shop;

use App\Rules\CheckPaymentMethodSberbank;
use App\Rules\Shop\CheckPaymentMethodTinkoff;
use App\Rules\Yandex\CheckPaymentMethodYandex;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentMethodsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'methods_main' => ['required', 'string'],
            'methods.tinkoff' => ['array', new CheckPaymentMethodTinkoff],
            'methods.yandex' => ['array', new CheckPaymentMethodYandex],
            'methods.sberbank' => ['array', new CheckPaymentMethodSberbank]
        ];
    }
}
