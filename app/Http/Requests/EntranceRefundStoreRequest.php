<?php

namespace App\Http\Requests;

use App\Rules\CheckArticlesOnValid;
use App\Rules\ValidProductCountForEntranceRefund;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EntranceRefundStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'partner_id' => ['required', 'exists:partners,id'],
            'store_id' => ['required', 'exists:stores,id'],
            'entrance_id' => ['required', 'exists:entrances,id'],
            'products' => ['required', 'array'],
            'products.*.count' => ['integer', 'min:1', new CheckArticlesOnValid],
            'comment' => ['nullable', 'string', 'max:512']
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
