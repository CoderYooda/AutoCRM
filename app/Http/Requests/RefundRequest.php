<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RefundRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'shipment_id' => ['required', 'exists:shipments,id'],
            'products' => ['required', 'array'],
//            'products.*.id' => ['required', 'exists:articles,id'],
            'products.*.count' => ['integer', 'min:1', 'max:9999']
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
