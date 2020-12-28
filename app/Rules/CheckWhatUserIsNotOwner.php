<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CheckWhatUserIsNotOwner implements Rule
{
    public function passes($attribute, $value)
    {
        //
    }

    public function message()
    {
        return 'The validation error message.';
    }
}
