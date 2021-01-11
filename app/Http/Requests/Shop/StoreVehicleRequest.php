<?php

namespace App\Http\Requests\Shop;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreVehicleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'vin_code' => ['required', 'string', 'max:255'],
            'mark_id' => ['nullable', 'exists:vehicle_marks,id'],
            'model_id' => ['nullable', 'exists:vehicle_models,id'],
            'modify_id' => ['nullable', 'exists:vehicle_modifies,id'],
            'year' => ['nullable', 'integer'],
            'comment' => ['nullable', 'string', 'max:65535']
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
