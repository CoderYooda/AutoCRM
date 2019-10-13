<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemMessage extends Model
{
    protected $table = 'system_message';
    public $guarded = [];

    public $fields = [
        'user_id',
        'reciever_id',
        'type',
        'link',
        'viewed',
        'message',
        'channel'
    ];

}
