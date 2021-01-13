<?php

namespace App\Http\Requests;

use App\Models\Partner;
use App\Rules\CheckPartnerSmsCode;
use App\Rules\HasFieldsForRole;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PartnerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        if ($this['issued_date'] == '__.__.____') {
            $this['issued_date'] = null;
        }

        if ($this['birthday'] == '__.__.____') {
            $this['birthday'] = null;
        }

        //Номер для выдачи доступа
        if($this->access == 1 && !isset($partner->user)) {
            $this['phone'] = clear_phone_number($this['phone']);
        }

        //Номера партнёра
        $phones = $this->phones ?? [];

        foreach ($phones as $key => $phone) {
            $phones[$key] = clear_phone_number($phone);
        }

        $this['phones'] = $phones;
    }

    public function rules()
    {
        $partner = Partner::find($this->id);

        $rules = [];

        $rules['phones'] = ['array'];
        $rules['phones.*.number'] = ['nullable', 'string', 'min:11'];

        #Проверка для доступа в систему
        if($this->access == 1 && !isset($partner->user)) {

            $rules['phone'] = ['required', 'string', 'between:11,11'];
            if($this->category_id == 5) $rules['role'] = ['exists:roles,name'];
            $rules['store_id'] = ['integer', 'exists:stores,id'];
        }

        if ($this->type == 0) {
            $rules += [
                'fio' => ['required', 'min:2', 'string', 'max:255'],
                'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
                'issued_by' => ['nullable', 'min:0', 'max:250'],
                'issued_date' => ['nullable', 'min:0', 'max:250', 'date_format:d.m.Y'],
                'issued_place' => ['nullable', 'min:0', 'max:250']
            ];
        } else if ($this->type == 2) {
            $rules += [
                'ur_fio' => ['required', 'min:4', 'string', 'max:255'],
                'companyName' => ['required', 'min:4', 'string', 'max:255'],
                'category_id' => ['required', 'min:0', 'max:255', 'exists:categories,id'],
                'opf' => ['required', 'string', 'max:3']
            ];
        }

        $rules['code'] = ['nullable', new CheckPartnerSmsCode];
        $rules['barcode'] = ['nullable', Rule::unique('partners', 'barcode')->ignore($this->id)];
        $rules['email'] = ['nullable', 'min:3', 'email'];
        $rules['vehicle_ids'] = ['nullable', 'array'];
        $rules['vehicle_ids.*'] = ['exists:vehicles,id'];

        return $rules;
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
