<?php


namespace App\Traits;

use App\Models\ProviderOrder;
use App\Models\Warrant;

trait PayableTrait
{
    public function warrants()
    {
        return $this->morphMany(Warrant::class, 'payable');
    }

    public function getPaidAmount()
    {
        return $this->warrants->sum('summ');
    }
}
