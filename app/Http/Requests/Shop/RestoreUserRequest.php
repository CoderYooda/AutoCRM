<?php

namespace App\Http\Requests\Shop;

use App\Rules\Shop\RestoreAttemptsCount;
use Illuminate\Foundation\Http\FormRequest;

class RestoreUserRequest extends FormRequest
{
    public function authorize()
    {
        $this['phone'] = str_replace(['(', ')', ' ', '-', '+'], '', $this['phone']);

        return true;
    }

    public function rules()
    {
        return [
            'phone' => ['required', 'exists:users,phone', new RestoreAttemptsCount]
        ];
    }
}
