<?php


namespace App\Services\ProviderService;

use App\Services\ProviderService\Contract\ProviderInterface;

class Providers
{
    /** @var ProviderInterface[] */
    private $providers = [];

    public function __construct($providers)
    {
        $this->providers = $providers;
    }

    public function all()
    {
        return $this->providers;
    }
}
