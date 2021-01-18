<?php

namespace App\Http\Middleware;
use Auth;

use Closure;

class Partner
{
    public function handle($request, Closure $next)
    {
        if(!Auth::user()->hasRole('Партнёр')){
            return redirect()->route('StoreIndex');
        }

        return $next($request);
    }
}
