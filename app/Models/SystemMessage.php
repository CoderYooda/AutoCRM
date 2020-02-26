<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class SystemMessage extends Model
{
    protected $table = 'system_message';
    public $guarded = [];

    public static function owned(){
        $user_id = Auth::user()->id;
        return self::where('reciever_id', $user_id);
    }

    public $fields = [
        'user_id',
        'reciever_id',
        'type',
        'kind_id',
        'kind',
        'link',
        'viewed',
        'message',
        'channel'
    ];

}
