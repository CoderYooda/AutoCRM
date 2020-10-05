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
        $this['nds'] = $this['nds'] ?? false;
        $this['nds_included'] = $this['nds_included'] ?? false;
        $this['locked'] = $this['locked'] ?? false;
    }

    public function rules()
    {
        return [
            'partner_id' => ['required', 'exists:partners,id'],
            'products' => ['required'],
            'products.*.id' => ['required', 'exists:articles,id'],
            'products.*.pivot_id' => ['exists:article_provider_orders,id'],
            'products.*.count' => ['required', 'integer', 'min:0', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000'],
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
