<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Auth;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class VehicleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => ['nullable', 'exists:vehicles,id'],
            'mark_id' => ['required', 'exists:vehicle_marks,id'],
            'model_id' => ['nullable', 'exists:vehicle_models,id'],
            'modify_id' => ['nullable', 'exists:vehicle_modifies,id'],
            'color' => ['nullable', 'string'],
            'type' => ['nullable', 'string'],
            'partner_id' => ['exists:partners,id'],
            'vin_code' => ['nullable', 'string'],
            'year' => ['nullable', 'integer', 'min:1950', 'max:' . Carbon::now()->year],
            'numberplate' => ['nullable', 'string']
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
