<?php

namespace App\Http\Requests\Shop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateDeliveryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this['has_pickup'] = $this['has_pickup'] ?? 0;
        $this['has_delivery'] = $this['has_delivery'] ?? 0;
    }

    public function rules()
    {
        return [
            'delivery_desc' => ['required', 'string', 'max:65535'],
            'seo_delivery_title' => ['nullable', 'string', 'max:65535'],
            'seo_delivery_desc' => ['nullable', 'string', 'max:65535'],
            'has_pickup' => ['required', 'integer', 'between:0,1'],
            'has_delivery' => ['required', 'integer', 'between:0,1'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['messages' => $validator->errors()], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
