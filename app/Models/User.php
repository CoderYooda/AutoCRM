<?php

namespace App\Models;

use App\Services\ShopManager\ShopManager;
use App\Traits\OwnedTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use OwnedTrait, Notifiable, HasRoles;

    protected $fillable = [
        'email', 'phone', 'password', 'company_id', 'banned_at', 'current_store'
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

    public function referal(){
        return $this->hasOne(Referal::class, 'user_id');
    }

    public function partner(){
        return $this->hasOne(Partner::class, 'user_id');
    }

    public function referal(){
        return $this->hasOne(Referal::class, 'user_id');
    }

    public function companyPartner()
    {
        /** @var ShopManager $shopManager */
        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        return $this->belongsTo(Partner::class, 'id', 'user_id')->where('company_id', $shop->company_id);
    }

    public function store()
    {
        return $this->hasOne(Store::class, 'id', 'current_store');
    }

    public function shop()
    {
        return $this->hasOne(Shop::class, 'company_id', 'company_id');
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

    public function createPartnerIfNotExists()
    {
        if($this->companyPartner) return;

        $shopManager = app(ShopManager::class);

        $shop = $shopManager->getCurrentShop();

        $params = $this->partner->getAttributes();

        unset($params['id'], $params['created_at'], $params['updated_at'], $params['deleted_at']);
        $params['company_id'] = $shop->company_id;
        $params['category_id'] = 7; //Категория покупателей
        $params['balance'] = 0;
        $params['store_id'] = null;

        $partner = Partner::create($params);

        $phones = [
            [
                'number' => $this->phone,
                'main' => 1
            ]
        ];

        $partner->upsertPhones($phones);
    }
}
