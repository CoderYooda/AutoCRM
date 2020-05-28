<?php


namespace App\Traits;

use App\Models\Warrant;

trait PayableTrait
{
    public function warrants()
    {
        return $this->morphMany(Warrant::class, 'payable');
    }
}
