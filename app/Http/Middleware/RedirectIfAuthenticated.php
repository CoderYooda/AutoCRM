<?php

namespace App\Http\Middleware;

use App\Services\ShopManager\ShopManager;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */

    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {

            /** @var ShopManager $shopManager */
            $shopManager = app(ShopManager::class);

            $shop = $shopManager->getCurrentShop();

            if($shop) {
                return redirect()->route('pages.index');
            }

            if(Auth::user()->roles->first() && Auth::user()->roles->first()->name == 'Суперадмин') {
                return redirect('/admin');
            } elseif(Auth::user()->roles->first() && Auth::user()->roles->first()->name == 'Реферальный партнёр') {
                return redirect('/ref_partner');
            } else {
                return redirect('/store');
            }
        }

        return $next($request);
    }
}
