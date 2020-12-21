<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class TabooSubdomainRule implements Rule
{
    private $subdomains = [
        'online',
        'test',
        'porno',
        'sex',
        'google',
        'yandex'
    ];

    public function passes($attribute, $value)
    {
        $params = explode('.', $value);

        $subdomain = current($params);

        return !in_array($subdomain, $this->subdomains);
    }

    public function message()
    {
        return 'Данное поддоменное имя запрещено.';
    }
}
