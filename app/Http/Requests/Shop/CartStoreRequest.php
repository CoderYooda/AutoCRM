<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class CartStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'hash' => ['required', 'string', 'max:255'],
            'order' => ['required', 'array'],
            'count' => ['required', 'between:1,99']
        ];
    }
}
