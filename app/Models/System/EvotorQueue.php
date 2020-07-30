<?php

namespace App\Models\System;

use http\Env\Request;
use Illuminate\Database\Eloquent\Model;

class EvotorQueue extends Model
{
    protected $table = 'evotor_queue';

    protected $guarded = [];
}
