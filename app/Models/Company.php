<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Company extends Model
{
    protected $guarded = [];

    public function shop()
    {
        return $this->hasOne(Shop::class);
    }

    public function getPayedDays()
    {
        return (int)(($this->payed_days - Carbon::now()->timestamp) / 86400);
    }

    public function getDays()
    {
        return (int)(($this->payed_days - Carbon::now()->timestamp) / 86400);
    }

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

    public function isServiceProviderActive($service_key)
    {
        return $this->serviceproviders->where('key', $service_key)->first()->pivot->enabled ?? 0;
    }

    public function serviceproviders()
    {
        return $this->belongsToMany(Service::class, 'service_company', 'company_id', 'service_id')->withPivot('enabled', 'sort');
    }

    public function getActiveServicesByCategory($category_id = 0)
    {
        return $this->serviceproviders()
            ->where('category_id', $category_id)
            ->whereHas('serviceproviders', function (Builder $query) {
                $query->where('enabled', 1);
            })
            ->orderBy('sort')
            ->get();
    }

    public function getServiceFieldValue($service_key, $field_name)
    {
        $field_id = ServiceField::where([
            'name' => $field_name,
            'service_key' => $service_key
        ])
        ->first()->id;

        return DB::table('service_field_values')
            ->where('company_id', $this->id)
            ->where('service_key', $service_key)
            ->where('field_id', $field_id)
            ->first()
            ->value ?? '';
    }

    public function getServiceFieldValues($service_key)
    {
        return DB::table('service_field_values')
                ->where('company_id', $this->id)
                ->where('service_key', $service_key)
                ->get();
    }

    public function cashboxes()
    {
        return $this->hasMany(Cashbox::class, 'company_id');
    }

    public function settings()
    {
        return $this->hasMany(Setting::class, 'company_id');
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
        return $this->members->first();
    }

    public function getSmsBalance()
    {
        return $this->sms_balance == null ? 0 : $this->sms_balance;
    }

    public function decrementSmsBalance($amount)
    {
        return $this->decrement('sms_balance', $amount);
    }
}
