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

    public function prepareForValidation()
    {
        if($this->refer ==! null){
            $refer = 'App\Models\\' . $this->refer;
            if(!is_subclass_of($refer, 'Illuminate\Database\Eloquent\Model')){
                throw new HttpResponseException(
                    response()->json(['message' => 'Попытка взлома зафиксирована', 'type' => 'error'], 422)
                );
            }

            $model = $refer::owned()->find($this->refer_id);
            if($model == null){
                throw new HttpResponseException(
                    response()->json(['message' => 'Попытка взлома зафиксирована', 'type' => 'error'], 422)
                );
            }
        }
    }

    public function rules()
    {
        return [
            'partner_id' => ['required','exists:partners,id'],
            'cashbox_id' => ['required','exists:cashboxes,id'],
            'ddsarticle_id' => ['required','exists:dds_articles,id'],
            'isIncoming' => ['boolean'],
            'summ' => ['required', 'numeric', 'between:1,' . (isset($this->max_summ) ? $this->max_summ : PHP_INT_MAX)],
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
