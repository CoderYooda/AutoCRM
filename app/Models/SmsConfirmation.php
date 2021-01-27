<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmsConfirmation extends Model
{
    protected $table = 'sms_confirmation';
    public $guarded = [];
    protected $connection = '';

}
