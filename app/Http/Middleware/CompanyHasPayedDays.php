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
                    'redirect' => route('SettingsIndex', ['active_tab' => 'payment']),
                ]);
            }

            return redirect()->route('SettingsIndex', ['active_tab' => 'payment']);
        }

        return $next($request);
    }
}
