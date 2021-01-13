<?php

namespace App\Traits;

use App\Models\Email;

trait Emailable
{
    public function emails()
    {
        return $this->morphMany(Email::class, 'emailable');
    }
}
