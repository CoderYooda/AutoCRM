<?php

namespace App\Models;

use App\Traits\Emailable;
use App\Traits\Phoneable;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use Phoneable, Emailable;

    protected $guarded = [];
}
