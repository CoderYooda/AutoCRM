<?php

namespace App\Http\Requests\Admin\Companies;

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
            'payed_days' => ['required', 'integer', 'between:0,999'],
            'blocked' => ['integer', 'between:0,1']
        ];
    }

    public function passedValidation()
    {
        if(!isset($this['blocked'])) $this['blocked'] = 0;
    }
}
