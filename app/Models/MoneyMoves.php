<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MoneyMoves extends Model
{
    protected $guarded = [];

    public $fields = [
        'do_date',
        'out_cashbox_id',
        'in_cashbox_id',
        'company_id',
        'summ',
        'comment',
        'balance',
    ];
}
