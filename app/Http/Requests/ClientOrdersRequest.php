<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ClientOrdersRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'partner_id' => ['required', 'exists:partners,id'],
            'discount' => ['required', 'integer', 'max:1000000', 'min:0'],
            'products' => ['required_without:quick_products'],
            'phone' => ['required'],
            'products.*.count' => ['integer', 'min:1', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000.00'],

            'products.new.*.price' => ['numeric', 'between:1,1000000.00'],
            'products.new.*.count' => ['integer', 'min:1', 'max:9999'],
            'products.new.*.name' => ['required', 'min:4', 'string', 'max:255'],
            'products.new.*.article' => ['required', 'string', 'max:64'],
            'products.new.*.new_supplier_name' => ['required', 'string', 'max:64']
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
