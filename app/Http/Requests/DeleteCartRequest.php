<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DeleteCartRequest extends FormRequest
{
    public function authorize()
    {
        $order = DB::table('providers_cart')->find($this->id);

        return $order->user_id == Auth::id();
    }

    public function rules()
    {
        return [
            'id' => ['required', 'exists:providers_cart,id']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['messages' => $validator->errors()], 422)
            );
        }

        parent::failedValidation($validator);

    }
}
