<?php

namespace App\Models;

use Spatie\Permission\Exceptions\RoleAlreadyExists;
use Spatie\Permission\Models\Role as ExtendedRole;
use Spatie\Permission\Guard;
use App\Traits\OwnedTrait;
use Auth;

class Role extends ExtendedRole
{

    use OwnedTrait;
//    public static function owned($company = null){
//        $company_id = $company ? $company->id : Auth::user()->company()->first()->id;
//        return self::where('company_id', $company_id);
//    }

	public static function create(array $attributes = [])
	{
		$attributes['guard_name'] = $attributes['guard_name'] ?? Guard::getDefaultName(static::class);
		
		if (static::where('name', $attributes['name'])->where('guard_name', $attributes['guard_name'])->where('company_id', $attributes['company_id'])->first()) {
			throw RoleAlreadyExists::create($attributes['name'], $attributes['guard_name']);
		}
		
		return static::query()->create($attributes);
	}

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
