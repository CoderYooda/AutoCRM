<?php


namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait OwnedTrait
{
    public static function owned($company = null){
        $company_id = $company ? $company->id : Auth::user()->company->id;
        return self::where('company_id', $company_id);
    }
}
