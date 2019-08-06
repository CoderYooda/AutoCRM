<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public function members(){
        return $this->belongsToMany('App\Models\User', 'user_company');
    }
}
