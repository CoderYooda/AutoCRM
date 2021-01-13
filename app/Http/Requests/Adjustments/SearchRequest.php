<?php

namespace App\Http\Requests\Adjustments;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_id' => 'exists:products,id'
        ];
    }
}
