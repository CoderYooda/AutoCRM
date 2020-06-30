<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class SaveCompanySettingsRequest extends FormRequest
{
    public function authorize()
    {
        return (int)$this->company_id == Auth::user()->company->id;
    }

    public function rules()
    {
        return [
            'name' => ['string', 'max:255'],
            'inn' => ['string', 'max:255'],
            'ogrn' => ['string', 'max:255'],
            'kpp' => ['string', 'max:255'],
            'actual_address' => ['string', 'max:255'],
            'legal_address' => ['string', 'max:255'],
            'bik' => ['string', 'max:255'],
            'bank' => ['string', 'max:255'],
            'cs' => ['string', 'max:255'],
            'rs' => ['string', 'max:255']
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
