<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public function members(){
        return $this->belongsToMany('App\Models\User', 'user_company');
    }
    public function stores(){
        return $this->hasMany('App\Models\Store', 'company_id');
    }

    public function checkAccessToStore($store){
        if($store == null || $this->stores()->where('id', $store->id)->first() == NULL){
            return false;
        } else {
            return true;
        }
    }
}
