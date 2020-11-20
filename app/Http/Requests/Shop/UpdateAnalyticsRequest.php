<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnalyticsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'yandex_verification' => ['nullable', 'string'],
            'yandex_metrics' => ['nullable', 'string']
        ];
    }
}
