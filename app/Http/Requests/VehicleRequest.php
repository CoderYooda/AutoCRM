<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Auth;

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
            'model_id' => ['required', 'exists:vehicle_models,id'],
            'partner_id' => ['exists:partners,id'],
            'vin_code' => ['nullable', 'string'],
            'year' => ['nullable', 'integer', 'min:1950', 'max:' . Carbon::now()->year],
            'numberplate' => ['nullable', 'string']
        ];
    }
}
