<?php

namespace App\Http\Requests\Shop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'address_name' => ['required', 'string', 'max:255'],
            'address_coords' => ['required', 'string', 'max:255'],
            'address_desc' => ['nullable', 'string', 'max:255'],
            'phones' => ['array', 'min:1'],
            'phones.*.number' => ['required', 'string'],
            'phones.*.desc' => ['required', 'string'],
            'phones_main' => ['required'],
            'emails' => ['array', 'min:1'],
            'emails.*.email' => ['required', 'string'],
            'emails.*.desc' => ['required', 'string'],
            'emails_main' => ['required']
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
