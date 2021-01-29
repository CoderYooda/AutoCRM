<?php

namespace App\Http\Requests\Shop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePagesRequest extends FormRequest
{
    public function authorize()
    {
        if($this['delete_image_ids'] != null) {
            $this['delete_image_ids'] = explode(',', $this['delete_image_ids']);
        }

        if($this['main_ids'] == null) $this['main_ids'] = [];
        else $this['main_ids'] = explode(',', $this['main_ids']);

        if($this['main_urls'] == null) $this['main_urls'] = [];
        else $this['main_urls'] = explode(',', $this['main_urls']);

        if($this['about_ids'] == null) $this['about_ids'] = [];
        else $this['about_ids'] = explode(',', $this['about_ids']);

        return true;
    }

    public function rules()
    {
        return [
            'contacts_desc' => ['nullable', 'string', 'max:65535'],
            'contacts_about_title' => ['nullable', 'string', 'max:65535'],
            'contacts_about_desc' => ['nullable', 'string', 'max:65535'],

            'about_desc' => ['nullable', 'string', 'max:65535'],
            'about_about_title' => ['nullable', 'string', 'max:65535'],
            'about_about_desc' => ['nullable', 'string', 'max:65535'],

            'delivery_desc' => ['nullable', 'string', 'max:65535'],
            'delivery_about_title' => ['nullable', 'string', 'max:65535'],
            'delivery_about_desc' => ['nullable', 'string', 'max:65535'],

            'warranty_desc' => ['nullable', 'string', 'max:65535'],
            'warranty_about_title' => ['nullable', 'string', 'max:65535'],
            'warranty_about_desc' => ['nullable', 'string', 'max:65535'],

            'main_ids' => ['array'],
            'main_ids.*' => ['exists:images,id'],
            'main_urls' => ['array', 'min:' . count($this->main_ids)],
            'main_urls.*' => ['required', 'string', 'active_url'],

            'about_ids' => ['array'],
            'about_ids.*' => ['exists:images,id'],
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
