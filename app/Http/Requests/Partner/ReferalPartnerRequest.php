<?php

namespace App\Http\Requests\Partner;

use Illuminate\Foundation\Http\FormRequest;
use phpDocumentor\Reflection\Types\Boolean;

class ReferalPartnerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        if ($this['phone']) {
            $this['phone'] = str_replace(array('(', ')', ' ', '-', '+'), '', $this['phone']);
        }
        $this['send_sms'] = $this['send_sms'] === 'on';
        $this['percent_first_b'] = $this['percent_first_b'] === 'on';
        $this['percent_each_b'] = $this['percent_each_b'] === 'on';
        $this['rubbles_first_b'] = $this['rubbles_first_b'] === 'on';
        $this['rubbles_each_b'] = $this['rubbles_each_b'] === 'on';

    }

    public function rules()
    {
        return [
            'name' => ['required'],
            'refer' => ['required'],
            'phone' => ['required', 'regex:/[0-9]{10}/', 'digits:11', 'unique:users'],
            'password' => 'required|string',
        ];
    }
}
