<?php

namespace App\Http\Requests;

use App\Models\Partner;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProviderOrdersRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this['discount'] = 0;
        $this['inpercents'] = 0;

        //TODO В валидаторе стоит проверка на max:100, зачем это?
//        if($this['inpercents']){
//            if((int)$this['discount'] >= 100){
//                $this['discount'] = 100;
//            }
//            if((int)$this['discount'] <= 0){
//                $this['discount'] = 0;
//            }
//        }

        if($this['nds'] === null) {
            $this['nds'] = false;
        }
        else {
            $this['nds'] = true;
        }

        if($this['inpercents'] === null){$this['inpercents'] = false;} else {$this['inpercents'] = true;}

        if($this['nds_included'] === null){
            $this['nds_included'] = false;
        }
        else {$this['nds_included'] = true;}

        if($this['locked'] === null){$this['locked'] = false;}
    }

    public function rules()
    {
        return [
            'partner_id' => ['required', 'exists:partners,id'],
            'discount' => ['required', 'integer', 'max:100', 'min:0'],
            'products' => ['required'],
            'products.*.count' => ['required', 'integer', 'min:0', 'max:9999'],
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
