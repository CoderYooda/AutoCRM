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

    protected function prepareForValidation()
    {
        $this['partner_id'] = $this['partner_id'] ?? Auth::user()->partner->id;
    }

    public function rules()
    {
        return [
            'mark_id' => ['required', 'exists:vehicle_marks,id'],
            'model_id' => ['required', 'exists:vehicle_models,id'],
            'partner_id' => ['required', 'exists:partners,id'],
            'vin_code' => ['required', 'string'],
            'year' => ['required', 'min:1950', 'max:' . Carbon::now()->year]
        ];
    }
}
