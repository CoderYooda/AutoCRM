<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalarySchema extends Model
{
    protected $guarded = [];

    public $fields = [
        'partner_id',
        'isPositive',
        'start_period',
        'end_period',
        'value'
    ];

}
