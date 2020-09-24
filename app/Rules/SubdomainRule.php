<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class SubdomainRule implements Rule
{
    public function passes($attribute, $value)
    {
        $params = explode('.', $value);

        $params[0] = '';
    }

    public function message()
    {
        return 'The validation error message.';
    }
}
