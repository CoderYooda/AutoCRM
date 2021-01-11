<?php

namespace App\Providers\Shop;

use App\Interfaces\Shop\FavoriteInterface;
use App\Services\Shop\FavoriteSession;
use Illuminate\Support\ServiceProvider;

class FavoriteServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->app->singleton(FavoriteInterface::class, function () {
            return new FavoriteSession;
//            return Auth::user() ? new FavoriteDatabase : new FavoriteSession;
        });

        \View::composer(['shop.*'], function ($view) {
            $view->with('favorite', app(FavoriteInterface::class));
        });
    }
}
