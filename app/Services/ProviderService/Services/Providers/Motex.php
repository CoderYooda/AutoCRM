<?php

namespace App\Services\ProviderService\Services\Providers;

use App\Services\ProviderService\Contract\ProviderInterface;
use App\Traits\ABCP;

class Motex implements ProviderInterface
{
    use ABCP;

    protected $host = 'http://id18596.public.api.abcp.ru/';

    protected $name = 'Мотекс';
    protected $service_key = 'motexc';
}
