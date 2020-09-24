<?php

namespace App\Http\Requests\Shop;

use App\Rules\DomainRule;
use App\Rules\SubdomainRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateSettingsRequest extends FormRequest
{
    public function authorize()
    {
        if($this['delete_image_ids'] != null) {
            $this['delete_image_ids'] = explode(',', $this['delete_image_ids']);
        }

        if(!isset($this['show_empty'])) $this['show_empty'] = 0;
        if(!isset($this['show_amount'])) $this['show_amount'] = 0;

        return true;
    }

    public function rules()
    {
        return [
            'show_empty' => ['required', 'integer', 'between:0,1'],
            'show_amount' => ['required', 'integer', 'between:0,1'],
            'storage_days' => ['required', 'integer', 'between:7,31'],
            'image_logotype_id' => ['exists:images,id'],
            'image_header_id' => ['exists:images,id'],
            'image_background_id' => ['exists:images,id'],
            'images' => ['array'],
            'images.*' => ['file', 'mimes:jpg,jpeg,png', 'max:5120'],
            'delete_image_ids' => ['nullable', 'array'],
            'delete_image_ids.*' => ['integer', 'exists:images,id'],
            'domain' => ['required_without:subdomain', 'string', new DomainRule],
            'subdomain' => ['required_without:domain', 'string', new SubdomainRule]
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['messages' => $validator->errors()], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
