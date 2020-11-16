<?php

namespace App\Http\Middleware;
use App\Services\ShopManager\ShopManager;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */

    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {

            /** @var ShopManager $shopManager */
            $shopManager = app(ShopManager::class);

            $shop = $shopManager->getCurrentShop();

            return route($shop ? 'pages.index' : 'login');
        }
    }
}
