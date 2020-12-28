<?php

namespace App\Http\Middleware;

use Closure;

class DebugBarChecker
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
        $ip = $request->ip();

        $whiteList = [
            '127.0.0.1',
            '82.151.112.193'
        ];

        if(!in_array($ip, $whiteList)) {
            \Debugbar::disable();
        }

        return $next($request);
    }
}
