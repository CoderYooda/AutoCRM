<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class WarrantRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {

//        $between = isset($this->max_summ) ? $this->max_summ : '99.99';
//        return [
//            'partner_id' => ['required','exists:partners,id'],
//            'cashbox_id' => ['required','exists:cashboxes,id'],
//            'ddsarticle_id' => ['required','exists:dds_articles,id'],
//            'isIncoming' => ['boolean'],
//            'summ' => ['required', 'numeric', 'between:0,' . $between],
//        ];


        return [
            'partner_id' => ['required','exists:partners,id'],
            'cashbox_id' => ['required','exists:cashboxes,id'],
            'ddsarticle_id' => ['required','exists:dds_articles,id'],
            'isIncoming' => ['boolean'],
            'summ' => ['required', 'numeric', 'between:0,' . (isset($this->max_summ) ? $this->max_summ : PHP_INT_MAX)],
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
