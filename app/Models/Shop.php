<?php

namespace App\Models;

use App\Traits\Phoneable;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use Phoneable;

    protected $guarded = [];

    public function phoneable()
    {
        return $this->morphTo();
    }
}
