<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class banned
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
        //dd(Auth::user()->banned_at);
        if (Auth::check() && Auth::user()->banned_at != null) {
            Auth::logout();

            if($request->ajax()){
//                return response()->json([
//                    'redirect' => true
//                ]);
            } else {
                return redirect()->route('login');
            }
        }
        return $next($request);
    }
}
