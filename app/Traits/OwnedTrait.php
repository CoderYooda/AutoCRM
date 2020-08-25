<?php


namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait OwnedTrait
{
    public function scopeOwned($query)
    {
        $company_id = Auth::user()->company->id;
        $query->where('company_id', $company_id);
    }
}
