<?php

namespace App\Rules\Shop;

use Illuminate\Contracts\Validation\Rule;

class CheckRestoreConfirmCode implements Rule
{
    public function passes($attribute, $value)
    {
        return session()->get('restore.code') == $value;
    }

    public function message()
    {
        return 'Неправильно введён код подтверждения.';
    }
}
