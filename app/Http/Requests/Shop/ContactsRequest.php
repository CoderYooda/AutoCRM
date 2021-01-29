<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class ContactsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'address_name' => ['required', 'string', 'max:255'],
            'address_coords' => ['required', 'string', 'max:255'],
            'address_desc' => ['nullable', 'string', 'max:255'],

            'phones' => ['array', 'min:1'],
            'phones.*.number' => ['required', 'string'],
            'phones.*.desc' => ['required', 'string'],
            'phones_main' => ['required'],

            'emails' => ['array', 'min:1'],
            'emails.*.email' => ['required', 'string'],
            'emails.*.desc' => ['required', 'string'],
            'emails_main' => ['required'],
        ];
    }
}
