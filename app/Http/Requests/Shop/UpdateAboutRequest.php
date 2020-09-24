<?php

namespace App\Http\Requests\Shop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateAboutRequest extends FormRequest
{
    public function authorize()
    {
        if($this['delete_image_ids'] != null) {
            $this['delete_image_ids'] = explode(',', $this['delete_image_ids']);
        }

        return true;
    }

    public function rules()
    {
        return [
            'about_desc' => ['required', 'string', 'max:255'],
            'images' => ['array'],
            'images.*' => ['file', 'mimes:jpg,jpeg,png', 'max:5120'],
            'delete_image_ids' => ['nullable', 'array'],
            'delete_image_ids.*' => ['integer', 'exists:images,id']
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
