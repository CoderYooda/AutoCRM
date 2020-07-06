<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;

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
        setlocale(LC_ALL, 'ru-RU.utf8');

        Gate::before(function ($user, $ability) {
            return $user->hasRole('Суперадмин');
        });
        Schema::defaultStringLength(191);
        \App\Models\Shipment::observe(\App\Observers\ShipmentObserver::class);
        \App\Models\Company::observe(\App\Observers\CompanyObserver::class);
        \App\Models\Partner::observe(\App\Observers\PartnerObserver::class);
        \App\Models\User::observe(\App\Observers\UserObserver::class);
        \App\Models\Warrant::observe(\App\Observers\WarrantObserver::class);
        \App\Models\Article::observe(\App\Observers\ArticleObserver::class);
        \App\Models\Entrance::observe(\App\Observers\EntranceObserver::class);
        \App\Models\Cashbox::observe(\App\Observers\CashboxObserver::class);

        Blade::directive('hide', function ($expression) {
            return "<?php if($expression) echo (\"style='display: none!important;'\"); ?>";
        });

        Blade::directive('done', function ($expression) {
            return "<?php if($expression) echo (\"d-none-f\"); ?>";
        });

        Blade::directive('disabled', function ($expression) {
            return "<?php if($expression) echo (\"disabled\"); ?>";
        });
    }

}
