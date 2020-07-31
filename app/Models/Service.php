<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
        return $this->hasMany(ServiceField::class, 'service_id');
    }

    public function serviceproviders()
    {
        return $this->belongsToMany(Company::class, 'service_company')->withPivot('key', 'enabled', 'company_id');
    }

    public function getServiceValueByField($field_id)
    {
        $company = Auth::user()->company;

        return DB::table('service_field_values')
            ->where('service_id', $this->id)
            ->where('company_id', $company->id)
            ->where('field_id', $field_id)
            ->first()
            ->value ?? '';
    }
}
