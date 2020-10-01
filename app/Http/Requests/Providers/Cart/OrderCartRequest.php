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
            'delivery_type_id' => ['required', 'string', 'max:144'],
            'payment_type_id' => ['required', 'string', 'max:144'],
            'pickup_address_id' => ['required', 'string', 'max:144'],
            'delivery_address_id' => ['required', 'string', 'max:144'],
            'date_shipment_id' => ['required', 'string', 'max:144']
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
