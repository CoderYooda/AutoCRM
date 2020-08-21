<?php

namespace App\Providers;

use App\Services\ProviderService\Providers;
use App\Services\ProviderService\Services\Providers\Mikado;
use App\Services\ProviderService\Services\Providers\AvtoImport;
use App\Services\ProviderService\Services\Providers\ArmTek;
use App\Services\ProviderService\Services\Providers\Trinity;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

use App\Services\ProviderService\Contract\ProviderInterface;

class AppProviderStoreService extends ServiceProvider
{
    public function register()
    {
        $this->app->tag([
            Trinity::class,
            AvtoImport::class,
            ArmTek::class,
            Mikado::class,
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
