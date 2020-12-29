<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PriceStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'price_id' => ['nullable', 'integer', 'exists:prices,id'],
            'name' => ['required', 'string', 'max:255'],
            'prices' => ['required', 'array'],
            'prices.*.from' => ['required', 'numeric', 'max:1000000'],
            'prices.*.to' => ['required', 'numeric', 'max:1000000'],
            'prices.*.percent' => ['required', 'numeric', 'max:1000000'],
        ];
    }
}
