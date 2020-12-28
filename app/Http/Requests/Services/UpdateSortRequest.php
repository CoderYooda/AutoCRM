<?php

namespace App\Http\Requests\Services;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSortRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'sorts' => ['required', 'array'],
            'sorts.*.id' => ['required', 'exists:services,id'],
            'sorts.*.sort' => ['required', 'min:0', 'max:100']
        ];
    }
}
