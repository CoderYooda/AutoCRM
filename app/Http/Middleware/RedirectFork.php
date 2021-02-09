<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class RedirectFork
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check() && $request->routeIs('indexPage')) {
            if (Auth::user()->roles->first() && Auth::user()->roles->first()->name == 'Суперадмин') {
                return redirect('/admin');
            } elseif (Auth::user()->roles->first() && Auth::user()->roles->first()->name == 'Реферальный партнёр') {
                return redirect('/ref_partner');
            } else {
                return redirect('/store');
            }
        }

        return $next($request);
    }
}
