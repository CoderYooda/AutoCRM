<?php


namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait OwnedTrait
{
    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }
}