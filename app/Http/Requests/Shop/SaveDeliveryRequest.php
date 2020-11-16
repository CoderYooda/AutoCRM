<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class SaveDeliveryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'addresses' => ['array'],
            'addresses.*' => ['nullable', 'string', 'max:255']
        ];
    }
}
