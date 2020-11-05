<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class UserFields implements Rule
{
    public function passes($attribute, $value)
    {
        $fields = [
            'fio',
            'birthday',
            'email',
            'password',
            'companyName',
            'opf',
            'inn',
            'ogrn',
            'bik',
            'bank',
            'cs',
            'rs',
            'ur_address',
            'fact_address'
        ];

        return in_array($value, $fields);
    }

    public function message()
    {
        return 'Недопустимое поле.';
    }
}
