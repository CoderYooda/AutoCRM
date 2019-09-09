<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warrant extends Model
{
    public $fields = [
        'do_date',
        'cashbox_id',
        'partner_id',
        'ddsarticle_id',
        'company_id',
        'summ',
        'reason',
        'comment',
        'isIncoming',
        'balance'
    ];
}
