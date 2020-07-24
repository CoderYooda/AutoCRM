<?php

namespace App\Providers;

use App\Services\ProviderService\Providers;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

use App\Services\ProviderService\Providers\Trinity;

use App\Services\ProviderService\Contract\ProviderInterface;

class AppProviderStoreService extends ServiceProvider
{
    public function register()
    {
        $this->app->tag([
            Trinity::class,
        ], [ ProviderInterface::class ]);

        $this->app->bind(Providers::class, function (Application $app) {
            return new Providers($app->tagged(ProviderInterface::class));
        });

    }

    public function boot()
    {
        //
    }
}
