<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAction extends Model
{
    protected $table = 'user_actions';
    public $guarded = [];

    public $fields = [
        'user_id',
        'comapny_id',
        'model',
        'model_id',
        'message'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

}
