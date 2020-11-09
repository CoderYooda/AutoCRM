<?php

namespace App\Http\Requests\Shop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'order_id' => ['required', 'exists:orders,id'],
            'comment' => ['nullable', 'string', 'max:512'],
            'products' => ['required'],
            'status' => ['required', 'string'],
            'products.*.name' => ['required', 'string'],
            'products.*.article' => ['required', 'string'],
            'products.*.manufacturer' => ['required', 'string'],
            'products.*.count' => ['required', 'integer', 'min:1', 'max:9999'],
            'products.*.price' => ['required', 'numeric', 'between:1,1000000'],
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
