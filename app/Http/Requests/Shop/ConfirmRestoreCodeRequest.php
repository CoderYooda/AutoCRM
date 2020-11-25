<?php

namespace App\Http\Requests\Shop;

use App\Rules\Shop\CheckRestoreConfirmCode;
use Illuminate\Foundation\Http\FormRequest;

class ConfirmRestoreCodeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'password' => ['required', 'string', 'min:8', 'max:32'],
            'code' => ['required', 'integer', new CheckRestoreConfirmCode]
        ];
    }
}
