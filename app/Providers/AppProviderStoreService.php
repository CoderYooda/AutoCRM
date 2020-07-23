<?php

namespace App\Providers;

use App\Services\test\test;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

use App\Services\test\Providers\qwe1;

use App\Services\test\Contract\ProviderInterface;

class AppProviderStoreService extends ServiceProvider
{
    public function register()
    {
        //$this->app->bind(qwe1::class);

        $this->app->tag([
            trinity::class,
            exist::class,

        ], [ ProviderInterface::class ]);

        $this->app->bind(test::class, function (Application $app) {
            return new test($app->tagged(ProviderInterface::class));
        });

    }

    public function boot()
    {
        //
    }
}
