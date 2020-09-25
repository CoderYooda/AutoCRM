<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWarrantyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'warranty_desc' => ['required', 'string', 'max:1024'],
            'seo_warranty_title' => ['nullable', 'string', 'max:2048'],
            'seo_warranty_desc' => ['nullable', 'string', 'max:2048']
        ];
    }
}
