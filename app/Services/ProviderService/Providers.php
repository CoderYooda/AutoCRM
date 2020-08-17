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

    public function activated()
    {
        $providers = [];

        foreach ($this->providers as $provider) {
            if($provider->isActivated()) $providers[] = $provider;
        }

        return $providers;
    }

    public function find(string $key)
    {
        foreach ($this->providers as $provider) {
            $provider_key = $provider->getServiceKey();
            if($provider_key == $key) return $provider;
        }

        return false;
    }
}
