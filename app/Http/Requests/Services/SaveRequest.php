<?php

namespace App\Http\Requests\Services;

use Illuminate\Foundation\Http\FormRequest;

class SaveRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'company_id' => ['integer', 'exists:companies,id'],
            'service_id' => ['integer', 'exists:services,id']
        ];
    }
}
