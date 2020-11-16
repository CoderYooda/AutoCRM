<?php

namespace App\Rules;

use App\Models\Shop;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class SubdomainRule implements Rule
{
    public function passes($attribute, $value)
    {
        $params = explode('.', $value);

        $subdomain = current($params);

        return !Shop::where('subdomain', $subdomain)->where('company_id', '!=', Auth::user()->company_id)->exists();
    }

    public function message()
    {
        return 'Данное поддоменное имя уже занято.';
    }
}
