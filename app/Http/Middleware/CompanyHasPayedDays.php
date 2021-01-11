<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Support\Facades\Auth;

class CompanyHasPayedDays
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
        $company = Auth::user()->company;

        if($company && Carbon::now()->timestamp > $company->payed_days && !Auth::user()->hasRole('Суперадмин')) {

            if($request->expectsJson()) {
                return response()->json([
                    'redirect' => route('UserIndex', ['active_tab' => 'service']),
                ]);
            }

            return redirect()->route('UserIndex', ['id' => Auth::user()->id, 'active_tab' => 'service']);
        }

        return $next($request);
    }
}
