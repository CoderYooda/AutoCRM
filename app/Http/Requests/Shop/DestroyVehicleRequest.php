<?php

namespace App\Http\Requests\Shop;

use App\Models\Vehicle;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DestroyVehicleRequest extends FormRequest
{
    public function authorize()
    {
        $partner = Auth::user()->companyPartner;

        $vehicle = Vehicle::find($this->vehicle_id);

        return $vehicle->partner_id == $partner->id;
    }

    public function rules()
    {
        return [
            'vehicle_id' => ['required', 'exists:vehicles,id']
        ];
    }
}
