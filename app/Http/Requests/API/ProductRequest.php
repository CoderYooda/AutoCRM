<?php

namespace App\Http\Requests\API;

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

        $this->sp_name = $request->sp_name ?? '';
        $this->sp_desc = $request->sp_desc ?? '';
        $this->sp_discount_price = $request->sp_discount_price ?? 0;
        $this->sp_discount = $request->sp_discount ?? 0;
        $this->sp_discount_type = $request->sp_discount_type ?? 0;

        if($this->sp_discount_type == 0) { //В рублях
            $this->sp_discount_total = $this->sp_discount_price - $this->sp_discount;
        }
        else {
            $this->sp_discount_total = $this->sp_discount_price - ($this->sp_discount_price / 100 * $this->sp_discount);
        }
    }

    public function rules()
    {
        $rules = [
            'name' => ['required', 'min:4', 'string', 'max:255'],
            'category.id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
            'supplier.id' => ['required', 'min:0', 'max:255', 'exists:suppliers,id'],
            'article' => ['required', 'string', 'max:64'],

            'storage_zone' => ['string', 'max:2'],
            'storage_rack' => ['string', 'max:2'],
            'storage_vertical' => ['string', 'max:2'],
            'storage_horizontal' => ['string', 'max:2'],


            'barcode' => ['nullable', Rule::unique('articles', 'barcode')->where('company_id', Auth::user()->company_id)->ignore($this->id)],

            'shop.name' => ['nullable', 'string', 'max:255'],
            'shop.desc' => ['nullable', 'string', 'max:1024'],
            'shop.specifications' => ['array'],
            'shop.specifications.*.*' => ['string', 'max:255'],
            'shop.settings.*.*' => ['accepted'],
            'shop.image_id' => ['nullable', 'exists:images,id'],
        ];

        if(isset($this['shop']['discounts']['discount'])) {
            $rules['shop.discounts.price'] = ['numeric', 'between:0,999999'];
            $rules['shop.discounts.discount'] = ['numeric', 'between:0,999999'];
            $rules['shop.discounts.type'] = ['integer', 'between:0,1'];
        }

        return $rules;
    }

    protected function passedValidation()
    {
        $shop = $this['shop'];

        foreach (['sp_stock', 'sp_main'] as $field) {
            $shop['settings'][$field] = filter_var($shop['settings'][$field] ?? null, FILTER_VALIDATE_BOOLEAN);
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
