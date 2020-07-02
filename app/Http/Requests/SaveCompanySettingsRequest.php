<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class SaveCompanySettingsRequest extends FormRequest
{
    public function authorize()
    {
        return (int)$this->company_id == Auth::user()->company->id;
    }

    public function prepareForValidation()
    {
        $this['similar_address'] = $this['similar_address'] == 'on' ? 1 : 0;
    }

    public function rules()
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'inn' => ['nullable', 'string', 'max:255'],
            'ogrn' => ['nullable', 'string', 'max:255'],
            'kpp' => ['nullable', 'string', 'max:255'],
            'actual_address' => ['nullable', 'string', 'max:255'],
            'legal_address' => ['nullable', 'string', 'max:255'],
            'bik' => ['nullable', 'string', 'max:255'],
            'bank' => ['nullable', 'string', 'max:255'],
            'cs' => ['nullable', 'string', 'max:255'],
            'rs' => ['nullable', 'string', 'max:255'],
            'owner' => ['nullable', 'string', 'max:255'],
            'auditor' => ['nullable', 'string', 'max:255'],
            'is_company' => ['required', 'between:0,1'],
            'similar_address' => ['boolean']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['messages' => $validator->errors()], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
