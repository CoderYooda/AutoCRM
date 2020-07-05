<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class SettingsMasterRequest extends FormRequest
{
    public function authorize()
    {
        return (int)$this->company_id == Auth::user()->company->id;
    }

    public function prepareForValidation()
    {
        $this['similar_address'] = $this['similar_address'] == 'on' ? 1 : 0;

        $employees = [];
        $partners = [];

        foreach($this->employees as $key => $employee){
            $employees[$key]['access'] = (boolean)$employee['access'];
            $employees[$key]['fio'] = $employee['fio'];
            $employees[$key]['phone'] = (int)str_replace(array('(', ')', ' ', '_', '.', '-', '+'), '', $employee['phone']);
        }

        foreach($this->partners as $key => $partner){
            $partners[$key]['companyName'] = $partner['companyName'];
            $partners[$key]['fio'] = $partner['fio'];
            $partners[$key]['phone'] = (int)str_replace(array('(', ')', ' ', '_', '.', '-', '+'), '', $partner['phone']);
        }

        $this['employees'] = $employees;
        $this['partners'] = $partners;
    }

    public function rules()
    {
        $rules = [
            'markup' => ['integer','min:0', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
            'inn' => ['nullable', 'string', 'max:255'],
            'ogrn' => ['nullable', 'string', 'max:255'],
            'kpp' => ['nullable', 'string', 'max:255'],
            'actual_address' => ['nullable', 'string', 'max:255'],
            'legal_address' => ['nullable', 'string', 'max:255'],
            'bik' => ['nullable', 'string', 'max:255'],
            'bank' => ['nullable', 'string', 'max:255'],
            'cs' => ['nullable', 'string', 'max:255'],
            'rs' => ['nullable', 'string', 'max:255'],
            'owner' => ['nullable', 'string', 'max:255'],
            'auditor' => ['nullable', 'string', 'max:255'],
            'is_company' => ['required', 'between:0,1'],
            'similar_address' => ['boolean'],
            'opf' => ['nullable', 'string', 'max:3']
        ];



        if(count($this->employees) > 0 && $this->employees[1]['fio']!= null){
            $rules['employees.*.fio'] = ['required', 'min:4', 'string', 'max:80'];
            $rules['employees.*.phone'] = ['integer', 'required', 'unique:users', 'digits:11'];
            $rules['employees.*.access'] = ['boolean', 'required'];
        }

        if(count($this->partners) > 0 && $this->partners[1]['companyName'] != null) {
            $rules['partners.*.companyName'] = ['required', 'min:4', 'string', 'max:80'];
            $rules['partners.*.fio'] = ['required', 'min:4', 'string', 'max:80'];
            $rules['partners.*.phone'] = ['integer', 'required', 'unique:users', 'digits:11'];
        }


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
