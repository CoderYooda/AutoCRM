<?php

namespace App\Models;

use App\Traits\OwnedTrait;
use Illuminate\Database\Eloquent\Model;
use Auth;

class Setting extends Model
{
    use OwnedTrait;

    protected $guarded = [];
}
