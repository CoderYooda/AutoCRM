<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            //
        ];
    }

    protected function prepareForValidation()
    {
        $this->search = mb_strtolower(str_replace(["-","!","?",".", ""],  "", trim($this->search)));
    }
}
