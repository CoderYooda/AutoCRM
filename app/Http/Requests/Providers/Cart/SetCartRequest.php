<?php

namespace App\Http\Requests\Providers\Cart;

use Illuminate\Foundation\Http\FormRequest;

class SetCartRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'provider_key' => ['required', 'string', 'max:255'],
            'delivery_key' => ['required', 'string', 'max:65000'],
            'stock' => ['required', 'string', 'max:255'],
            'manufacturer' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'article' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'between:1,9999999'],
            'count' => ['required', 'integer', 'min:0', 'max:9999']
        ];
    }
}
