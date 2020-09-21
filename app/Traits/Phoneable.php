<?php

namespace App\Traits;

use App\Models\Phone;

trait Phoneable
{
    public function phones()
    {
        return $this->morphMany(Phone::class, 'phoneable');
    }
}
