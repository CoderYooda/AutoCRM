<?php

namespace App\Http\Requests;

use App\Rules\Import\EncodeRule;
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
            'id' => ['required', 'exists:stores,id'],
            'file' => ['required', 'file', 'mimes:csv,txt,xml', 'max:' . convertPHPSizeToBytes(ini_get('upload_max_filesize')), new EncodeRule()]
        ];
    }
}
