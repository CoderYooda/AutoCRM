<?php

namespace App\Http\Requests\Shop;

use App\Rules\DomainDnsRule;
use App\Rules\DomainRule;
use App\Rules\Shop\CorrectSubdomainName;
use App\Rules\SubdomainRule;
use App\Rules\TabooSubdomainRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateMainRequest extends FormRequest
{
    public function authorize()
    {
        if($this['delete_image_ids'] != null) {
            $this['delete_image_ids'] = explode(',', $this['delete_image_ids']);
        }

        if(!isset($this['show_empty'])) $this['show_empty'] = 0;
        if(!isset($this['show_amount'])) $this['show_amount'] = 0;
        if(!isset($this['supplier_offers'])) $this['supplier_offers'] = 0;

        if($this['image_ids'] == null) $this['image_ids'] = [];
        else $this['image_ids'] = explode(',', $this['image_ids']);

        if($this['image_urls'] == null) $this['image_urls'] = [];
        else $this['image_urls'] = explode(',', $this['image_urls']);

        return true;
    }

    public function rules()
    {
        $rules = [
            'name' => ['required', 'string'],
            'emails' => ['array', 'min:1'],
            'emails.*.email' => ['required', 'string'],
            'show_empty' => ['required', 'integer', 'between:0,1'],
            'show_amount' => ['required', 'integer', 'between:0,1'],
            'domain_type' => ['required', 'string', 'in:our,private'],
//            'storage_days' => ['required', 'integer', 'between:7,31'],
//            'image_favicon_id' => ['nullable', 'exists:images,id'],
//            'image_logotype_id' => ['nullable', 'exists:images,id'],
//            'image_header_id' => ['nullable', 'exists:images,id'],
//            'image_background_id' => ['nullable', 'exists:images,id'],
//            'image_ids' => ['array'],
//            'image_ids.*' => ['exists:images,id'],
//            'image_urls' => ['array'],
//            'image_urls.*' => ['required', 'active_url'],
//            'delete_image_ids' => ['nullable', 'array'],
//            'delete_image_ids.*' => ['integer', 'exists:images,id'],
            'domain' => ['nullable', 'string', new DomainRule, new DomainDnsRule],
            'subdomain' => ['nullable', 'string', new SubdomainRule, new TabooSubdomainRule, new CorrectSubdomainName],
            'price_id' => ['required', 'integer', 'exists:prices,id']
        ];

        return $rules;
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
