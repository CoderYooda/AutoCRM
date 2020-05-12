<?php

namespace App\Http\Requests;

use App\Models\Partner;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProviderOrdersRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        if($this['nds'] === null) {
            $this['nds'] = false;
        }
        else {
            $this['nds'] = true;
        }

        if($this['nds_included'] === null) {
            $this['nds_included'] = false;
        }
        else {
            $this['nds_included'] = true;
        }

        if($this['locked'] === null){$this['locked'] = false;}
    }

    public function rules()
    {
        return [
            'partner_id' => ['required', 'exists:partners,id'],
            'products' => ['required'],
            'products.*.count' => ['required', 'integer', 'min:0', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000.00'],
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
