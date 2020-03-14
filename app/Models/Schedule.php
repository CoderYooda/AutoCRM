<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Schedule extends Model
{
    protected $table = 'schedule';
    protected $hidden = ['created_at', 'id', 'company_id', 'updated_at'];
    protected $guarded = [];
//    protected $casts = [
//        'start' => 'hh:mm',
//        'end' => 'hh:mm',
//    ];

    public function getStartAttribute($value)
    {
        return Carbon::parse($value)->format('H:i');
    }
    public function getEndAttribute($value)
    {
        return Carbon::parse($value)->format('H:i');
    }
}
