<?php

namespace App\Http\Requests\Providers\Cart;

use Illuminate\Foundation\Http\FormRequest;

class AddCartRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'provider_key' => ['required', 'string', 'max:255'],
            'article' => ['required', 'string', 'max:255'],
            'product' => ['required', 'array'],
            'count' => ['required', 'integer', 'between:1,999']
        ];
    }
}
