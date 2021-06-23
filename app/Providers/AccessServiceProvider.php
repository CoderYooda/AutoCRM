<?php

namespace App\Providers;
use Illuminate\Support\ServiceProvider;


class AccessServiceProvider extends ServiceProvider
{
    public function boot()
    {
        //
    }

    public function register()
    {
        $this->app->bind(
            \App\Repositories\Notification\NotificationRepositoryContract::class,
            \App\Repositories\Notification\NotificationRepository::class
        );
    }
}
