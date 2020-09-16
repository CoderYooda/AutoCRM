<?php

namespace App\Http\Requests;

use App\Http\Controllers\SupplierController;
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

            'image' => ['file', 'mimes:jpeg,png,svg', 'max:5120'],

            'barcode' => ['nullable', Rule::unique('articles', 'barcode')->where('company_id', Auth::user()->company_id)->ignore($this->id)]
        ];
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
