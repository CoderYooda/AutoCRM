<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $guarded = [];

    public $fields = [
        'company_id',
        'user_id',
        'category_id',
        'isfl',
        'fio',
        'birthday',
        'address',
        'email',
        'comment',
        'companyName',
        'ur_address',
        'fact_address',
        'inn',
        'ogrn',
        'bank',
        'bik',
        'kpp',
    ];

    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }

    public function phones()
    {
        return $this->belongsToMany('App\Models\Phone', 'partner_phone');
    }

    public function passport()
    {
        return $this->hasOne('App\Models\Passport');
    }

    public function car()
    {
        return $this->hasOne('App\Models\Car');
    }
}
