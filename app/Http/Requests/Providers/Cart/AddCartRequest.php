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
            'delivery_key' => ['required', 'string', 'max:255'],
            'manufacturer' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'article' => ['required', 'string', 'max:255'],
            'price' => ['numeric', 'between:1,9999999']
        ];
    }
}
