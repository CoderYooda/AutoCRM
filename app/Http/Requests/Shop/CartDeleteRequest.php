<?php

namespace App\Http\Requests\Shop;

use App\Rules\CartHasProduct;
use Illuminate\Foundation\Http\FormRequest;

class CartDeleteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_id' => ['required', new CartHasProduct]
        ];
    }
}
