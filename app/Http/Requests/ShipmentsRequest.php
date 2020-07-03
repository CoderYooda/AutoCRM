<?php

namespace App\Http\Requests;

use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class ShipmentsRequest extends FormRequest
{
    public function authorize()
    {
        if($this->id){
            $shipment = Shipment::find($this->id);
            return $shipment->company_id == Auth::user()->company->id;
        }
        return true;

    }

    public function prepareForValidation()
    {
        //TODO check
        if($this->do_date == null) $this->do_date = Carbon::now();
    }

    public function rules()
    {
        return [
            'partner_id' => ['required', 'exists:partners,id'],
            'discount' => ['required', 'integer', 'max:1000000', 'min:0'],
            'products' => ['required'],
            'products.*.count' => ['integer', 'min:1', 'max:9999'],
            'products.*.price' => ['numeric', 'between:1,1000000.00'],
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
