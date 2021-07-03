<?php

namespace App\Providers;

use App\Services\ProviderService\Contract\CartInterface;
use App\Services\ProviderService\Providers;
use App\Services\ProviderService\Services\Providers\Motex;
use App\Services\ProviderService\Services\Cart\CartDatabase;
use App\Services\ProviderService\Services\Providers\AutoEuro;
use App\Services\ProviderService\Services\Providers\AutoPiter;
use App\Services\ProviderService\Services\Providers\AutoRus;
use App\Services\ProviderService\Services\Providers\Berg;
use App\Services\ProviderService\Services\Providers\AutoTrade;
use App\Services\ProviderService\Services\Providers\FavoritParts;
use App\Services\ProviderService\Services\Providers\ForumAuto;
use App\Services\ProviderService\Services\Providers\Mikado;
use App\Services\ProviderService\Services\Providers\AvtoImport;
use App\Services\ProviderService\Services\Providers\ArmTek;
use App\Services\ProviderService\Services\Providers\MskRechie;
use App\Services\ProviderService\Services\Providers\Partkom;
use App\Services\ProviderService\Services\Providers\ProfitLiga;
use App\Services\ProviderService\Services\Providers\Rossko;
use App\Services\ProviderService\Services\Providers\StParts;
use App\Services\ProviderService\Services\Providers\Trinity;
use App\Services\ProviderService\Services\Providers\ShateM;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

use App\Services\ProviderService\Contract\ProviderInterface;

class AppProviderStoreService extends ServiceProvider
{
    public function register()
    {
        $this->app->tag([
            Trinity::class,
            AvtoImport::class,
            ArmTek::class,
            Mikado::class,
            AutoRus::class,
            AutoEuro::class,
            ForumAuto::class,
            AutoPiter::class,
            MskRechie::class,
            StParts::class,
            Berg::class,
            FavoritParts::class,
            Rossko::class,
            Partkom::class,
            ProfitLiga::class,
            ShateM::class,
            Motex::class,
            AutoTrade::class,
        ], [ ProviderInterface::class ]);

        $this->app->bind(Providers::class, function (Application $app) {
            return new Providers($app->tagged(ProviderInterface::class));
        });

        $this->app->singleton(CartInterface::class, function () {
            return new CartDatabase;
//            return Auth::check() ? new DatabaseCart : new SessionCart;
        });
    }

    public function boot()
    {
        //
    }
}
