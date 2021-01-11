<?php

namespace App\Http\Requests;

use App\Models\Order;
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
            'status' => [('between:0,' . (count(Order::$statuses) - 1))],
            'products.*.pivot_id' => ['integer', 'exists:article_client_orders,id'],
            'products.*.product_id' => ['exists:products,id'],
            'products.*.count' => ['integer', 'min:1', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000.00']
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
