<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Illuminate\Support\Facades\Session;

class SuperAdmin
{
    public function handle($request, Closure $next)
    {

        if(!Auth::user()->hasRole('Суперадмин')){
            return redirect()->route('StoreIndex');
        }

        return $next($request);
    }
}
