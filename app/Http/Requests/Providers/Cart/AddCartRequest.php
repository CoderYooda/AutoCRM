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
            'data.model' => ['required', 'json']
        ];
    }

    protected function passedValidation()
    {
        $this['data']['model'] = json_decode($this['data']['model']);
    }
}
