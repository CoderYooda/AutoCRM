<?php

namespace App\Http\Requests\Shop;

use App\Rules\Shop\CheckPaymentMethod;
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
//            'methods.tinkoff.api_key' => ['nullable', 'string'],
//            'methods.tinkoff.terminal_key' => ['nullable', 'string'],
            'methods_main' => ['required', 'string'],
            'methods.tinkoff' => ['array', new CheckPaymentMethod],
        ];
    }
}
