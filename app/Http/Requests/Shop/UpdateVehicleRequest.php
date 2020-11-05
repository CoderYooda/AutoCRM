<?php

namespace App\Http\Requests\Shop;

use App\Models\Vehicle;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize()
    {
        $partner = Auth::user()->companyPartner;

        return $partner->id == $this->vehicle->partner_id;
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
}
