<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = [];

    public function members(){
        return $this->hasMany('App\Models\User', 'company_id');
    }

    public function stores(){
        return $this->hasMany('App\Models\Store', 'company_id');
    }

    public function cashboxes(){
        return $this->hasMany('App\Models\Cashbox', 'company_id');
    }

    public function checkAccessToStore($store){
        if($store == null || $this->stores()->where('id', $store->id)->first() == NULL){
            return false;
        } else {
            return true;
        }
    }

    public function inviteUser($user)
    {
        $user->company_id = $this->id;
        $user->save();
        return 1;
    }
}
