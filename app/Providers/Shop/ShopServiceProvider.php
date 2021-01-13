<?php

namespace App\Providers\Shop;

use App\Services\ShopManager\ShopManager;
use Illuminate\Support\ServiceProvider;

class ShopServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->app->singleton(ShopManager::class, function () {
            return new ShopManager;
        });
    }
}
