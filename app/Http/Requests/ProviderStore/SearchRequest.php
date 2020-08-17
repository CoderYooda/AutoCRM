<?php

namespace App\Http\Requests\ProviderStore;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SearchRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'search' => ['required']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json([
                    'message' => $validator->errors()->first(),
                    'type' => 'error'
                ], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
