<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Cashbox extends Model
{
    use SoftDeletes;

    protected $guarded = [];


    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public static function owned(){
        $company_id = Auth::user()->company()->first()->id;
        return self::where('company_id', $company_id);
    }

    public function addition($summ){
        $this->balance = $this->balance + $summ;
        $this->save();
        return $this;
    }

    public function subtraction($summ){
        $this->balance = $this->balance - $summ;
        $this->save();
        return $this;
    }

}
