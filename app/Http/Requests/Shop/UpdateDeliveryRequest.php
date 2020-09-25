<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDeliveryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'delivery_desc' => ['required', 'string', 'max:1024'],
            'seo_delivery_title' => ['nullable', 'string', 'max:2048'],
            'seo_delivery_desc' => ['nullable', 'string', 'max:2048']
        ];
    }
}
