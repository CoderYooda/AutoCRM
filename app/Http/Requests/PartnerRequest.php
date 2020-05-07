<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PartnerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = null;

        if($this->isfl){
            $rules = [
                'fio' => ['required', 'min:4', 'string', 'max:255'],
                'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id']
            ];

            $active = false;
            foreach($this->phones as $phone){if($phone['number'] != NULL){$active = true;}}
            if($active){$rules['phones.*.number'] = ['min:0', 'required', 'regex:/^(\+?[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/'];}
            if($this->number){
                $rules['number'] = ['min:0', 'digits:10', 'integer'];
            }
            if($this->issued_by){$rules['issued_by'] = ['min:0', 'max:250'];}
            if($this->issued_date){$rules['issued_date'] = ['min:0', 'max:250', 'date_format:d.m.Y'];}
            if($this->issued_place){$rules['issued_place'] = ['min:0', 'max:250'];}

        } elseif(!$this->isfl) {
            $rules = [
                'ur_fio' => ['required', 'min:4', 'string', 'max:255'],
                'companyName' => ['required', 'min:4', 'string', 'max:255'],
                'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
            ];
        }
        if($this->email){$rules['email'] = ['min:3', 'email'];}
        if($this->phone != null){
            $rules['phone'] = ['unique:users'];
        }

//        foreach($this->store as $id => $store){
//            if(isset($store['isset']) && $store['isset'] == true){
//                $rules['store.' . $id . '.location'] = [ 'max:250'];
//                $rules['store.' . $id . '.isset'] = [ 'boolean'];
//            }
//        }

        return $rules;
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
