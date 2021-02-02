<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Referal extends Model
{
    protected $guarded = [];
    protected $table = 'referal';

    public $fields = [
        'name',
        'user_id',
        'code',
        'percent_first_b',
        'percent_each_b',
        'rubbles_first_b',
        'rubbles_each_b',
        'percent_first_value',
        'percent_each_value',
        'rubbles_first_value',
        'rubbles_each_value',
        'comment',
    ];

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'referal_company', 'referal_id', 'company_id');
    }
}
