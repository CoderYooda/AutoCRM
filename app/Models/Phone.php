<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $guarded = [];

    public $fields = [
        'company_id',
        'number',
        'main',
    ];
}
