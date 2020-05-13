<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StatisticRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'manager_id' => ['exists:partners,id'],
            'partner_id' => ['exists:partners,id'],
            'begin_date' => ['date_format:Y-m-d', 'before:final_date'],
            'final_date' => ['date_format:Y-m-d', 'after:begin_date'],
            'entity' => ['integer', 'min:0', 'max:3']
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
