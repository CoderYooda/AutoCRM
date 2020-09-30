<?php

namespace App\Providers;

use App\Models\DocumentType;
use App\Models\Order;
use App\Observers\OrderObserver;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(\Faker\Generator::class, function () {
            return \Faker\Factory::create('ru_RU');
        });
    }

    public function boot()
    {
        $lang = config('app.locale');

        setlocale(LC_ALL, $lang . '.UTF-8');
        setlocale(LC_NUMERIC, 'en.UTF-8');
        Carbon::setLocale($lang);

        Gate::before(function ($user, $ability) {
            return $user->hasRole('Суперадмин');
        });
        Schema::defaultStringLength(191);
        \App\Models\Shipment::observe(\App\Observers\ShipmentObserver::class);
        \App\Models\Company::observe(\App\Observers\CompanyObserver::class);
        \App\Models\Partner::observe(\App\Observers\PartnerObserver::class);
        \App\Models\User::observe(\App\Observers\UserObserver::class);
        \App\Models\Warrant::observe(\App\Observers\WarrantObserver::class);
        \App\Models\Entrance::observe(\App\Observers\EntranceObserver::class);
        \App\Models\Cashbox::observe(\App\Observers\CashboxObserver::class);
        Order::observe(OrderObserver::class);

        \View::composer([get_template() . '.documents.index'], function ($view) {
            $view->with('documentsTypes', DocumentType::all());
        });

        \View::composer([get_template() . '.store.layout.tabs'], function ($view) {
            $orders_count = Order::where('company_id', Auth::user()->company_id)->where('status', 0)->count();
            $view->with('orders_count', $orders_count);
        });

        \View::composer([get_template() . '.documents.index'], function ($view) {
            $view->with('documentsTypes', DocumentType::all());
        });

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
