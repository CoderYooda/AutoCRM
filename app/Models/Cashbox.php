<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cashbox extends Model
{
    protected $guarded = [];


    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }
}
