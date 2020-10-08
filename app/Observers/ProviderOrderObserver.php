<?php

namespace App\Observers;

use App\Models\ProviderOrder;

class ProviderOrderObserver
{
    public function saving(ProviderOrder $providerOrder)
    {
        $status = 0;

        if(-$providerOrder->wsumm > 0 && -$providerOrder->wsumm < $providerOrder->summ){
            $status = 1;
        } else if(-$providerOrder->wsumm == $providerOrder->summ){
            $status = 2;
        } else if(-$providerOrder->wsumm > $providerOrder->summ){
            $status = 3;
        }

        $providerOrder->pays = $status;

        dd($providerOrder);
    }
}
