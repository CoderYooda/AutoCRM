<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    public $table = 'payment_methods';

    protected $guarded = [];

    public $timestamps = false;

    public $casts = [
        'params' => 'array'
    ];
}
