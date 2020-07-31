<?php

namespace App\Http\Requests\Services;

use App\Rules\CheckServiceFieldOnValid;
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
            'enabled' => ['integer', 'min:0', 'max:1'],
            'fields' => ['required', 'array'],
            'fields.*' => ['required', 'string', 'max:255', 'min:1', new CheckServiceFieldOnValid]
        ];
    }
}
