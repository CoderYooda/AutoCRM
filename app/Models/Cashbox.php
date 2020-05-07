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

    public function warrants()
    {
        return $this->hasMany('App\Models\Warrant', 'cashbox_id' );
    }

    public function addition($sum){
        $this->increment('balance', $sum);
        return $this;
    }

    public function getLastOperation()
    {
        $warrant = $this->warrants()->first();

        if($warrant){
            if($warrant->isIncoming){
                return '+' . sprintf("%.2f", $warrant->summ) . ' (' . $warrant->ddsarticle()->first()->name . ')';
            } else {
                return '-' . sprintf("%.2f", $warrant->summ) . ' (' . $warrant->ddsarticle()->first()->name . ')';
            }
        } else {
            return 0;
        }
    }

    public function subtraction($sum){
        $this->decrement('balance', $sum);
        return $this;
    }

}
