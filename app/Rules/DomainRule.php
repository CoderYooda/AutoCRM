<?php

namespace App\Rules;

use App\Models\Shop;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class DomainRule implements Rule
{
    public function passes($attribute, $value)
    {
        if($value == getenv('APP_DOMAIN')) return false;

        return !Shop::where('domain', $value)->where('company_id', '!=', Auth::user()->company_id)->exists();
    }

    public function message()
    {
        return 'Данное доменное имя уже используется в нашей системе, обратитесь в тех. поддержку.';
    }
}
