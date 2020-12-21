<?php

namespace App\Rules\Shop;

use Illuminate\Contracts\Validation\Rule;

class CorrectSubdomainName implements Rule
{
    public function passes($attribute, $value)
    {
        return !preg_match("/[^A-Za-z0-9]/", $value);
    }

    public function message()
    {
        return 'Поддоменное имя может содержать только латинские буквы и цифры.';
    }
}
