<?php

namespace App\Http\Requests;

use App\Rules\Adjustments\CheckExistArticles;
use App\Rules\Adjustments\CheckExistEntrances;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdjustmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'products' => ['required'],
            'products.*' => [new CheckExistEntrances, new CheckExistArticles],
            'products.*.*' => ['required', 'between:0,999']
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
