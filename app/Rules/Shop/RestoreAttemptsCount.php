<?php

namespace App\Rules\Shop;

use Illuminate\Contracts\Validation\Rule;

class RestoreAttemptsCount implements Rule
{
    public function passes($attribute, $value)
    {
        $count = session('restore.attempts', 0);

        session()->put('restore.attempts', $count + 1);

        return $count < 3;
    }

    public function message()
    {
        return 'Превышен лимит отправки сообщений.';
    }
}
