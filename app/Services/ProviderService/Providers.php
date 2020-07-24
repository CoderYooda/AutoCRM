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

    public function find(int $id)
    {
        foreach ($this->providers as $provider) {
            $provider_id = $provider->getServiceId();

            if($provider_id == $id) return $provider;
        }

        return false;
    }
}
