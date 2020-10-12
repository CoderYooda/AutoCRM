<?php

namespace App\Providers;

use App\Models\Shop;
use App\Services\ShopManager\ShopManager;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppShopServiceProvider extends ServiceProvider
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
