<?php

namespace App\Services\ProviderService\Services\Providers;

use App\Services\ProviderService\Contract\ProviderInterface;
use App\Traits\ABCP;

class StParts implements ProviderInterface
{
    use ABCP;

    protected $host = 'http://stparts.ru.public.api.abcp.ru/';

    protected $name = 'STparts';
    protected $service_key = 'stparts';


}
