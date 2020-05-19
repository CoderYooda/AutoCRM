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

    public function prepareForValidation()
    {
        if($this['manager_id'] == 0) unset($this['manager_id']);
        if($this['partner_id'] == 0) unset($this['partner_id']);
    }

    public function rules()
    {
        return [
            'manager_id' => ['exists:partners,id'],
            'partner_id' => ['exists:partners,id'],
            'begin_date' => ['required', 'date_format:Y-m-d', 'before:final_date'],
            'final_date' => ['required', 'date_format:Y-m-d', 'after:begin_date'],
            'entity' => ['required', 'integer', 'min:-1', 'max:7']
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
