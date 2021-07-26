<?php

namespace App\Models;

use Carbon\Carbon;
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

    public function getIssuedDate()
    {
        $date = Carbon::createFromFormat('Y-m-d', $this->issued_date);

        return $this->issued_date ? $date->format('d.m.Y') : 'Не указана';
    }
}
