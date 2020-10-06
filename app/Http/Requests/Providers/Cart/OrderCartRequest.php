<?php

namespace App\Http\Requests\Providers\Cart;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class OrderCartRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'comment' => ['max:512'],

            'orders' => ['array'],
            'orders.*.count' => ['required', 'between:1,99'],

            'providers' => ['required', 'array'],
            'providers.*.delivery_type_id' => ['nullable', 'string', 'max:144'],
            'providers.*.payment_type_id' => ['nullable', 'string', 'max:144'],
            'providers.*.pickup_address_id' => ['nullable', 'string', 'max:144'],
            'providers.*.delivery_address_id' => ['nullable', 'string', 'max:144'],
            'providers.*.date_shipment_id' => ['nullable', 'string', 'max:144'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['messages' => $validator->errors()], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
