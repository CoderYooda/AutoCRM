<?php

namespace App\Http\Requests;

use App\Rules\Adjustments\CheckEntranceNewCount;
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
            'comment' => ['string', 'max:1024'],
            'products' => ['required'],
            'products.*' => [new CheckExistEntrances, new CheckExistArticles],
            'products.*.*.count' => ['required', 'between:0,999', new CheckEntranceNewCount],
            'products.*.*.price' => ['required', 'between:0,' . PHP_FLOAT_MAX]
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
