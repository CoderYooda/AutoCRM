<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Auth;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'phone', 'password', 'company_id', 'banned_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function company(){
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function partner(){
        return $this->hasOne('App\Models\Partner', 'user_id');
    }

    public function getStoreFirst(){
        return $this->partner()->first()->store()->first();
    }
	
	public static function owned()
	{
		$company_id = Auth::user()->company()->first()->id;
		return self::where('company_id', $company_id);
	}

    public function attachToCompany($company)
    {
        $this->company_id = $company->id;
        $this->save();
        return 1;
    }
}
