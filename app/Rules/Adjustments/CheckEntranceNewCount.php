<?php

namespace App\Rules\Adjustments;

use Illuminate\Contracts\Validation\Rule;

class CheckEntranceNewCount implements Rule
{
    public function passes($attribute, $value)
    {
        if(strpos($attribute, 'new') !== false && (int)$value < 1) return false;

        return true;
    }

    public function message()
    {
        return 'У новой записи не может быть количество меньше ноля.';
    }
}
