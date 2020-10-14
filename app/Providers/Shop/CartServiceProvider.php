<?php

namespace App\Providers\Shop;

use App\Interfaces\Shop\CartInterface;
use App\Services\ProviderService\Services\Cart\CartDatabase;
use App\Services\Shop\CartSession;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class CartServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->app->singleton(CartInterface::class, function () {
            return Auth::user() ? new CartDatabase : new CartSession;
        });
    }
}
