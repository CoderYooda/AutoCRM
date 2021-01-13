<?php


namespace App\Services\ProviderService;

use App\Services\ProviderService\Contract\ProviderInterface;
use NunoMaduro\Collision\Provider;

class Providers
{
    /** @var ProviderInterface[] */
    private $providers;

    protected static $errors = [
        401 => 'Ошибка авторизации',
        404 => 'Ничего не найдено'
    ];

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

            $provider_key = $provider->getServiceKey();

            if($provider->isActivated()) $providers[$provider_key] = $provider;
        }

        return $providers;
    }

    public function find(string $key) : ?ProviderInterface
    {
        foreach ($this->providers as $provider) {
            $provider_key = $provider->getServiceKey();
            if($provider_key == $key) return $provider;
        }

        return null;
    }

    public static function getErrorMessageByCode($code)
    {
        foreach (self::$errors as $errorCode => $message) {
            if($code == $errorCode) return $message;
        }

        return 'Неизвестная ошибка';
    }
}
