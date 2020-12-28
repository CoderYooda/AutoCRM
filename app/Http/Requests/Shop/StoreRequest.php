<?php

namespace App\Http\Requests\Shop;

use App\Models\Order;
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
        $order = Order::find($this->order_id);

        $rules = [
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

        if($order->delivery_type == Order::DELIVERY_TYPE_TRANSPORT) {
            $rules['delivery_price'] = ['required', 'numeric', 'between:0,100000'];
        }

        return $rules;
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
