<?php

namespace App\Rules;

use App\Models\ServiceField;
use Illuminate\Contracts\Validation\Rule;

class CheckServiceFieldOnValid implements Rule
{
    public function __construct()
    {
        //
    }

    public function passes($attribute, $value)
    {
        $name = explode('.', $attribute)[1];

        return ServiceField::where(['name' => $name, 'service_id' => request()->service->id])->exists();
    }

    public function message()
    {
        return 'Передан невалидный ключ поля';
    }
}
