<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(\Faker\Generator::class, function () {
            return \Faker\Factory::create('ru_RU');
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Суперадмин') ? true : null;
        });
        \App\Models\Shipment::observe(\App\Observers\ShipmentObserver::class);
        \App\Models\Company::observe(\App\Observers\CompanyObserver::class);
        \App\Models\Partner::observe(\App\Observers\PartnerObserver::class);
        \App\Models\User::observe(\App\Observers\UserObserver::class);
        \App\Models\Warrant::observe(\App\Observers\WarrantObserver::class);
        \App\Models\Article::observe(\App\Observers\ArticleObserver::class);
    }
}
