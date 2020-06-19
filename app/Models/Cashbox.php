<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cashbox extends Model
{
    use OwnedTrait, SoftDeletes;

    protected $guarded = [];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function warrants()
    {
        return $this->hasMany(Warrant::class, 'cashbox_id' );
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

    public function addition($sum)
    {
        $this->update(['balance' => $this->balance + $sum]);

        return $this;
    }

    public function subtraction($sum)
    {
        $this->update(['balance' => $this->balance - $sum ]);

        return $this;
    }

}
