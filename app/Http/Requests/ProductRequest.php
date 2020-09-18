<?php

namespace App\Http\Requests;

use App\Http\Controllers\SupplierController;
use App\Models\Store;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        if ($this['new_supplier_name'] != null && $this['supplier_id'] == null) {
            $supplier = SupplierController::silent_store($this);
            $this['supplier_id'] = $supplier->id;
        }
    }

    public function rules()
    {
        return [
            'name' => ['required', 'min:4', 'string', 'max:255'],
            'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
            'supplier_id' => ['required', 'min:0', 'max:255', 'exists:suppliers,id'],
            'article' => ['required', 'string', 'max:64'],

            'storage_zone' => ['string', 'max:2'],
            'storage_rack' => ['string', 'max:2'],
            'storage_vertical' => ['string', 'max:2'],
            'storage_horizontal' => ['string', 'max:2'],

            'image' => ['file', 'mimes:jpg,jpeg,png,gif', 'max:5120'],

            'barcode' => ['nullable', Rule::unique('articles', 'barcode')->where('company_id', Auth::user()->company_id)->ignore($this->id)],

            'shop.name' => ['nullable', 'string', 'max:255'],
            'shop.desc' => ['nullable', 'string', 'max:1024'],
            'shop.specifications' => ['array'],
            'shop.specifications.*.*' => ['string', 'max:255'],
            'shop.product_settings.*.*' => ['accepted'],
            'shop.image' => ['file', 'mimes:jpeg,bmp,png', 'max:5120']
        ];
    }

    protected function passedValidation()
    {
        $shop = $this['shop'];

        $stores = Store::owned()->get();

        foreach ($stores as $store) {
            foreach (['sp_empty', 'sp_stock', 'sp_main'] as $field) {
                $shop['product_settings'][$store->id][$field] = filter_var($shop['product_settings'][$store->id][$field] ?? null, FILTER_VALIDATE_BOOLEAN);
            }
        }

        $this['shop'] = $shop;
    }

    protected function failedValidation(Validator $validator)
    {
        if($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['messages' => $validator->errors()], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
