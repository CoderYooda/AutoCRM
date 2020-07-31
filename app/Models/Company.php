<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Company extends Model
{
    protected $guarded = [];

    public function members()
    {
        return $this->hasMany(User::class, 'company_id');
    }

    public function partners()
    {
        return $this->hasMany(Partner::class, 'company_id');
    }

    public function stores()
    {
        return $this->hasMany(Store::class, 'company_id');
    }

    public function isServiceProviderActive($service_id)
    {
        return $this->serviceproviders->find($service_id)->pivot->enabled ?? 0;
    }

    public function serviceproviders()
    {
        return $this->belongsToMany(Service::class, 'service_company')->withPivot('key', 'service_id', 'enabled');
    }

    public function getActiveServicesByCategory($category_id = 0)
    {
        return $this->serviceproviders()
            ->where('category_id', $category_id)
            ->whereHas('serviceproviders', function (Builder $query) {
                $query->where('enabled', 1);
            })
            ->get();
    }

    public function getServiceFieldValue($service_id, $field)
    {
        return $this->serviceproviders()->find($service_id)->pivot->$field;
    }

    public function cashboxes()
    {
        return $this->hasMany(Cashbox::class, 'company_id');
    }

    public function settings()
    {
        return $this->hasMany(Setting::class, 'company_id');
    }

    public function checkAccessToStore($store)
    {
        //TODO check
        return ($store == null || $this->stores()->find($store->id) == NULL);
    }

    public function getSettingField($field)
    {
        return $this->settings->where('name', $field)->first()->value;
    }

    public function getOfficialNameAttribute()
    {
        $return_name = '';

        if($this->is_company) {
            $return_name = (($this->opf . ' ') ?? '') . $this->name;
        }
        else {
            $return_name = 'ИП ' . $this->name;
        }

        return $return_name;
    }

    public function getFirstCompanyMember() // TODO получать лидера компании
    {
        return $this->members()->first();
    }

    public function getSmsBalance()
    {
        return $this->sms_balance == null ? 0 : $this->sms_balance;
    }

    public function decrementSmsBalance($amount)
    {
        return $this->decrement('sms_balance', $amount);
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
