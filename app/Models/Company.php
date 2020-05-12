<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = [];

    public function members(){
        return $this->hasMany(User::class, 'company_id');
    }

    public function stores(){
        return $this->hasMany(Store::class, 'company_id');
    }

    public function cashboxes(){
        return $this->hasMany(Cashbox::class, 'company_id');
    }

    public function checkAccessToStore($store){
        //TODO check
        return ($store == null || $this->stores()->where('id', $store->id)->first() == NULL);
    }

    public function getFirstCompanyMember() // TODO получать лидера компании
    {
        return $this->members()->first();
    }

    public function inviteUser($user)
    {
        //TODO check
        $user->update(['company_id' => $this->id]);

//        $user->company_id = $this->id;
//        $user->save();
        return 1;
    }
}
