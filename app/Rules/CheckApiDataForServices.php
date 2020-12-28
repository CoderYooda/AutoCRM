<?php

namespace App\Rules;

use App\Models\Service;
use Illuminate\Contracts\Validation\Rule;

class CheckApiDataForServices implements Rule
{
    public function passes($attribute, $value)
    {
        /** @var Service $service */
        $service = request()->service;

        return $service->getProviderService()->checkConnect($value);
    }

    public function message()
    {
        return 'Неправильно указаны данные для подключения.';
    }
}
