<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    protected function prepareForValidation()
    {
        $this['phone'] = str_replace(['(', ')', ' ', '-', '+'], '', $this['phone']);
    }

    public function rules()
    {
        return [
            //
        ];
    }
}
