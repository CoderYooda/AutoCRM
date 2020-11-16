<?php


namespace App\Services\ProviderService\Services\Providers;

use App\Services\ProviderService\Contract\ProviderInterface;
use App\Traits\ABCP;

class AvtoImport implements ProviderInterface
{
    use ABCP;

    protected $host = 'http://id8341.public.api.abcp.ru/';

    protected $name = 'AvtoImport';
    protected $service_key = 'avtoimport';
}
