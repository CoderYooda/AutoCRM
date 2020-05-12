<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class MoneyMoveRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this['company_id'] = Auth::user()->company()->first()->id;

        if($this['do_date'] == null) {
            $this['do_date'] = Carbon::now();
        }
    }

    public function rules()
    {
        return [
            'company_id' => ['required','exists:companies,id'],
            'in_cashbox_id' => ['required','exists:cashboxes,id', 'different:out_cashbox_id'],
            'out_cashbox_id' => ['required','exists:cashboxes,id', 'different:in_cashbox_id'],
            'summ' => ['required', 'integer', 'min:0', 'max:100000000'],
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
