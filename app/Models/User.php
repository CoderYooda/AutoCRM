<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Auth;

class User extends Authenticatable
{
    use OwnedTrait, Notifiable, HasRoles;

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'company_id', 'banned_at', 'current_store'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function company(){
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function partner(){
        return $this->hasOne(Partner::class, 'user_id');
    }

    public function getStoreFirst(){
        return $this->partner->store()->first();
    }

    public function getProvidersCartOrders()
    {
        return $this->hasOne(CartProviderOrder::class);
    }

    public function attachToCompany($company)
    {
        $this->update(['company_id' => $company->id]);
        return 1;
    }
}
