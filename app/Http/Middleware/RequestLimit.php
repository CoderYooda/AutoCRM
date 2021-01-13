<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class RequestLimit
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */

    public function handle(Request $request, Closure $next)
    {
        $key = Auth::id() . '.' . $request->route()->name;

        if(Cache::has($key)) {
            return response()->json([
                'type' => 'error',
                'message' => 'Слишком частые запросы к серверу.'
            ]);
        }

        Cache::remember($key, Carbon::now()->addSeconds(2), function () {
            return true;
        });

        return $next($request);
    }
}
