<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class CartSaveRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_id' => ['required', 'exists:articles,id'],
            'count' => ['required', 'integer', 'between:1,999']
        ];
    }
}
