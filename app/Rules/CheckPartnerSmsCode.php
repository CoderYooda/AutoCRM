<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CheckPartnerSmsCode implements Rule
{
    public function passes($attribute, $value)
    {
        return (int)$value == session('partner_code');
    }

    public function message()
    {
        return 'Неправильно указан код из SMS.';
    }
}
