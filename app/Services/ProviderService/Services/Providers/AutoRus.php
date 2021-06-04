<?php

namespace App\Services\ProviderService\Services\Providers;

use App\Services\ProviderService\Contract\ProviderInterface;
use App\Traits\ABCP;

class AutoRus implements ProviderInterface
{
    use ABCP;

    protected $host = 'http://autorus.public.api.abcp.ru/';

    protected $name = 'AutoRus';
    protected $service_key = 'autorus';

}
