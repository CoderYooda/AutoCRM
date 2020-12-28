<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;

class SMSMessages extends Model
{
    use OwnedTrait;

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
