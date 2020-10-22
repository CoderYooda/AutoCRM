<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class CartOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this['rules'] = $this['rules'] == 'on' ? 1 : 0;
        $this['register'] = $this['register'] == 'on' ? 1 : 0;
        $this['basePhone'] = str_replace(['(', ')', ' ', '-', '+'], '', $this['basePhone']);
    }

    public function rules()
    {
        $rules = [
            'basePhone' => ['required'],
            'email' => ['required', 'email'],
            'store_id' => ['required', 'exists:stores,id'],
            'comment' => ['nullable', 'string'],
            //
            'delivery_type' => ['required', 'integer', 'between:0,1'],
            'pay_type' => ['required', 'integer', 'between:0,1'],
            'rules' => ['required', 'integer', 'between:0,1'],
            'register' => ['required', 'integer', 'between:0,1']
        ];

        $registerType = $this->register_type;

        if($registerType == 'fl' || $registerType == 'ip') {
            $rules['name']  = ['required', 'string'];
            $rules['surname'] = ['required', 'string'];
            $rules['middlename'] = ['required', 'string'];
        }

        if($registerType == 'ip' || $registerType == 'ul') {
            $rules['inn'] = ['required', 'string'];
            $rules['ur_address'] = ['nullable', 'string'];
        }

        if($registerType == 'ip' || $registerType == 'ul') {
            $rules['ogrn'] = ['nullable', 'string'];
            $rules['bik'] = ['nullable', 'string'];
            $rules['bank'] = ['nullable', 'string'];
            $rules['cs'] = ['nullable', 'string'];
            $rules['rs'] = ['nullable', 'string'];
            $rules['actual_address'] = ['nullable', 'string'];
        }

        if($registerType == 'ul') {
            $rules['opf'] = ['required', 'string', 'min:2'];
            $rules['company_name'] = ['required', 'string'];
        }

        return $rules;
    }
}
