<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use SoftDeletes;

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

    public function firstActivePhoneNumber()
    {
        $phones = $this->phones();
        $num_out = 'Основной номер не указан';
        if($phones){
            $number = $phones->where('main', true)->first();
            if($number){
                $num_out = $number->number;
            }
        }
        return $num_out;
    }

    public function passport()
    {
        return $this->hasOne('App\Models\Passport');
    }

    public function car()
    {
        return $this->hasOne('App\Models\Car');
    }

    public function outputName() //Вывод имени или наименования компании
    {
        if($this->isfl){
            return $this->fio;
        } else {
            return $this->companyName;
        }
    }
}
