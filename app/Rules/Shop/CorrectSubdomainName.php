<?php

namespace App\Rules\Shop;

use Illuminate\Contracts\Validation\Rule;

class CorrectSubdomainName implements Rule
{
    public function passes($attribute, $value)
    {
        if(strpos($value, '.bbcrm.ru') === false) return false;

        return true;
    }

    public function message()
    {
        return 'Поддоменное имя должно быть формата: example.bbcrm.ru';
    }
}
