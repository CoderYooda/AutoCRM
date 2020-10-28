<?php

namespace App\Http\Requests\Shop;

use App\Rules\UserFields;
use Illuminate\Foundation\Http\FormRequest;

class SaveUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'field' => ['required', 'string', 'max:144', new UserFields],
            'value' => ['required', 'string', 'max:255']
        ];
    }
}
