<?php

namespace App\Http\Requests;

use App\Models\ClientOrder;
use App\Models\EntranceRefund;
use http\Client;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class WarrantRequest extends FormRequest
{
    private $max_summ = PHP_INT_MAX;

    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        if($this->refer ==! null){
            $refer = 'App\Models\\' . $this->refer;
            if(!is_subclass_of($refer, 'Illuminate\Database\Eloquent\Model')){
                throw new HttpResponseException(
                    response()->json(['message' => 'Попытка взлома зафиксирована', 'type' => 'error'], 422)
                );
            }

            $model = $refer::owned()->find($this->refer_id);
            if($model == null){
                throw new HttpResponseException(
                    response()->json(['message' => 'Попытка взлома зафиксирована', 'type' => 'error'], 422)
                );
            }

            $this->max_summ = (double)$model->itogo - (double)$model->wsumm;

            if(get_class($model) == ClientOrder::class && !$this->isIncoming) {
                $this->max_summ = (double)$model->wsumm;
            }
            elseif(get_class($model) == EntranceRefund::class) {
                $this->max_summ = $model->getTotalPrice() - $model->wsumm;
            }
        }
    }

    public function rules()
    {
        return [
            'partner_id' => ['required','exists:partners,id'],
            'cashbox_id' => ['required','exists:cashboxes,id'],
            'ddsarticle_id' => ['required','exists:dds_articles,id'],
            'isIncoming' => ['boolean'],
            'summ' => ['required', 'numeric', 'between:1,' . ($this->max_summ == PHP_INT_MAX ? PHP_INT_MAX : $this->max_summ)],
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
