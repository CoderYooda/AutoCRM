<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DomainRule implements Rule
{
    public function passes($attribute, $value)
    {
        return preg_match("/^([a-zA-Z0-9][a-zA-Z0-9-_]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+$/", $value);
    }

    public function message()
    {
        return 'Поле :attribute должно быть домменым именем без http(s) протокола, пример: google.com, www.google.com';
    }
}
