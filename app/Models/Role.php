<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Spatie\Permission\Exceptions\RoleAlreadyExists;
use Spatie\Permission\Models\Role as ExtendedRole;
use Spatie\Permission\Guard;
use Auth;

class Role extends ExtendedRole
{
    use OwnedTrait;

	public static function create(array $attributes = [])
	{
		$attributes['guard_name'] = $attributes['guard_name'] ?? Guard::getDefaultName(static::class);
		
		if (static::where('name', $attributes['name'])->where('guard_name', $attributes['guard_name'])->where('company_id', $attributes['company_id'])->first()) {
			throw RoleAlreadyExists::create($attributes['name'], $attributes['guard_name']);
		}
		
		return static::query()->create($attributes);
	}
}
