<?php

namespace App\Http\Requests;

use App\Models\Setting;
use App\Rules\ValidateFilters;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class   StatisticRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        if ($this['manager_id'] == 0) unset($this['manager_id']);
        if ($this['partner_id'] == 0) unset($this['partner_id']);
        if ($this['dds_id'] == 0) unset($this['dds_id']);

        if (!isDate($this['begin_date']) && !isDate($this['final_date'])) {
            $this['begin_date'] = Carbon::now()->addMonth(-1)->format('d.m.Y');
            $this['final_date'] = Carbon::now()->format('d.m.Y');
        }
    }

    public function rules()
    {
        return [
            'manager_id' => ['exists:partners,id'],
            'partner_id' => ['exists:partners,id'],
            'dds_id' => ['exists:dds_articles,id'],
            'begin_date' => ['required', 'date_format:d.m.Y', 'before:final_date'],
            'final_date' => ['required', 'date_format:d.m.Y', 'after:begin_date'],
            'entities' => ['array'],
            'entities.*' => [new ValidateFilters]
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
