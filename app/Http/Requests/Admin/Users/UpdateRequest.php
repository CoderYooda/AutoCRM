<?php

namespace App\Http\Requests\Admin\Users;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'password' => ['nullable', 'string', 'min:8', 'max:32'],
            'banned_at' => ['nullable', 'integer', 'between:0,1']
        ];
    }
}
