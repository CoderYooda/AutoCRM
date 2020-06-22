<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImportRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'store_id' => ['required', 'exists:stores'],
            'file' => ['required', 'file', 'mimes:csv,xml', 'max:2048']
        ];
    }
}
