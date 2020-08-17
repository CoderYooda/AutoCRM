<?php

namespace App\Http\Requests\Services;

use App\Rules\CheckApiDataForServices;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ToggleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'enabled' => ['required', 'integer', 'between:0,1'],
        ];

        if($this->enabled == 0) {
            $rules['fields'] = ['required', 'array', new CheckApiDataForServices];
        }

        return $rules;
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
