<?php
/**
 * Created by PhpStorm.
 * User: daddy
 * Date: 23.06.2021
 * Time: 13:19
 */

namespace App\Providers;


use App\Services\NotifyService;
use Illuminate\Support\ServiceProvider;

class FacadeServiceProvider extends ServiceProvider
{
    public function boot()
    {
        //
    }

    public function register()
    {
        $this->app->bind(
            'notify.service',function() {
            return new NotifyService;
        });
    }
}
