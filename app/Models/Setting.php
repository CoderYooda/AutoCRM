<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Setting extends Model
{
    protected $guarded = [];

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }
}
