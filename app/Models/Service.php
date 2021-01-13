<?php

namespace App\Models;

use App\Services\ProviderService\Providers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Service extends Model
{
    protected $guarded = [];

    protected $table = 'services';

    public $timestamps = false;

    public function fields()
    {
        return $this->hasMany(ServiceField::class, 'service_key','key');
    }

    public function getProviderService()
    {
        /** @var Providers $providers */
        $providers = app()->get(Providers::class);

        return $providers->find($this->key);
    }

    public function serviceproviders()
    {
        return $this->belongsToMany(Company::class, 'service_company')->withPivot('enabled', 'company_id');
    }

    public function getServiceValueByField($field_id)
    {
        $company = Auth::user()->company;

        return DB::table('service_field_values')
            ->where('service_key', $this->key)
            ->where('company_id', $company->id)
            ->where('field_id', $field_id)
            ->first()
            ->value ?? '';
    }
}
