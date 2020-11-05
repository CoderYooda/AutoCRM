<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $guarded = [];

    public function emailable()
    {
        return $this->morphTo();
    }
}
