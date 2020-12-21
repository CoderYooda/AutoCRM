<?php


namespace App\Traits;

use App\Models\Partner;

trait HasManagerAndPartnerTrait
{
    public function manager()
    {
        return $this->belongsTo(Partner::class, 'manager_id');
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class, 'partner_id');
    }
}
