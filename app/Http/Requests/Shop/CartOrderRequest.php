<?php

namespace App\Http\Requests\Shop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CartOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this['rules'] = $this['rules'] == 'on' ? 1 : 0;
        if(!Auth::check()) $this['basePhone'] = str_replace(['(', ')', ' ', '-', '+'], '', $this['basePhone']);
    }

    public function rules()
    {
        $rules = [
            'pickup_id' => ['required', 'exists:stores,id'],
            'delivery_type' => ['required', 'integer', 'between:0,1'],
            'delivery_id' => ['nullable', 'integer', 'exists:delivery_addresses,id'],
            'pay_type' => ['required', 'integer', 'between:0,1'],
            'rules' => ['required', 'integer', 'between:0,1'],
            'comment' => ['nullable', 'string']
        ];

        if(!Auth::check()) {

            $rules['basePhone'] = ['required', 'string', 'min:11'];
            $rules['email'] = ['required', 'email'];
            //
            $rules['register_type'] = ['required', 'string'];
            $rules['register'] = ['required', 'integer', 'between:0,1'];
            $rules['name'] = ['required', 'string'];
            $rules['surname'] = ['required', 'string'];
            $rules['middlename'] = ['required', 'string'];

            if($this['register']) {
                $rules['basePhone'] = ['required', 'string', 'min:11', 'unique:users,phone'];
                $rules['password'] = ['required', 'string', 'min:8'];
            }

            $registerType = $this->register_type;

            if($registerType == 'ip' || $registerType == 'ul') {
                $rules['inn'] = ['required', 'string'];
                $rules['ogrn'] = ['nullable', 'string'];
            }

            if($registerType == 'ul') {
                $rules['opf'] = ['required', 'string', 'min:2'];
                $rules['companyName'] = ['required', 'string'];
            };
        }

        return $rules;
    }

    public function failedValidation(Validator $validator)
    {
        dd($validator->errors()->getMessages());
    }
}
