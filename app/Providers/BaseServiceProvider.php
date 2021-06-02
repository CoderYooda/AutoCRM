<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BaseServiceProvider extends ServiceProvider
{
    public function boot()
    {

    }

    public function register()
    {
        $this->app->bind(
            \App\Repositories\Shipment\ShipmentRepositoryContract::class,
            \App\Repositories\Shipment\ShipmentRepository::class
        );
    }
}
