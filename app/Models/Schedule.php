<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Auth;

class Schedule extends Model
{
    use OwnedTrait;

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
