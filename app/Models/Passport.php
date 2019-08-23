<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Passport extends Model
{
    protected $guarded = [];

    public $fields = [
        'number',
        'issued_by',
        'issued_date',
        'issued_place',
    ];
}
