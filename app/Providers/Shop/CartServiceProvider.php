<?php

namespace App\Providers\Shop;

use App\Interfaces\Shop\CartInterface;
use App\Services\Shop\CartSession;
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
            return new CartSession;
//            return Auth::user() ? new CartDatabase : new CartSession;
        });

        \View::composer(['shop.*'], function ($view) {
            $view->with('cart', app(CartInterface::class));
        });
    }
}
