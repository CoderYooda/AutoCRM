<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SMSMessages extends Model
{
    public $fields = [
        'partner_id',
        'company_id',
        'phone',
        'code',
        'status_code',
        'sms_id',
        'cost',
        'ip',
        'message',
    ];

    protected $guarded = [];

    public function normalizedData(){
        return $this->created_at->format('d.m.Y (H:i)');
    }
}
