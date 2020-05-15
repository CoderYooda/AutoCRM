<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class StoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'min:3', 'string', 'max:255'],
        ];
    }

    protected function prepareForValidation()
    {
        if(!Gate::allows('Смотреть поступления')){

            Permission::create(['name' => 'Смотреть товары',            'model' => 'Article',       'type' => 'read']);
            Permission::create(['name' => 'Создавать товары',           'model' => 'Article',       'type' => 'create']);
            Permission::create(['name' => 'Удалять товары',             'model' => 'Article',       'type' => 'delete']);
            Permission::create(['name' => 'Редактировать товары',       'model' => 'Article',       'type' => 'edit']);
            return PermissionController::closedResponse('Вам запрещено просматривать этот раздел, для получения доступа обратитесь к администратору.');
        }
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
