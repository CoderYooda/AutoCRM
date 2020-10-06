<?php

namespace App\Providers;

use App\Models\Cashbox;
use App\Models\Company;
use App\Models\DocumentType;
use App\Models\Entrance;
use App\Models\Order;
use App\Models\Partner;
use App\Models\Shipment;
use App\Models\User;
use App\Models\Warrant;
use App\Observers\CashboxObserver;
use App\Observers\CompanyObserver;
use App\Observers\EntranceObserver;
use App\Observers\OrderObserver;
use App\Observers\PartnerObserver;
use App\Observers\ShipmentObserver;
use App\Observers\UserObserver;
use App\Observers\WarrantObserver;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;

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

        Shipment::observe(ShipmentObserver::class);
        Company::observe(CompanyObserver::class);
        Partner::observe(PartnerObserver::class);
        User::observe(UserObserver::class);
        Warrant::observe(WarrantObserver::class);
        Entrance::observe(EntranceObserver::class);
        Cashbox::observe(CashboxObserver::class);
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
