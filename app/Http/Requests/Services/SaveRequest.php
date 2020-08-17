<?php

namespace App\Http\Requests\Services;

use App\Models\Service;
use App\Rules\CheckApiDataForServices;
use App\Rules\CheckServiceFieldOnValid;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'fields.*' => ['nullable', 'string', 'max:255', 'min:1'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['messages' => $validator->errors()], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
