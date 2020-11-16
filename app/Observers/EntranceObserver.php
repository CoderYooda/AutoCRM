<?php

namespace App\Observers;

use App\Models\Entrance;
use App\Models\ProviderOrder;

class EntranceObserver
{
    public function deleted(Entrance $entrance)
    {
        $payable = $entrance->payable;
        if($payable){
            if($entrance->isIncoming){
                $payable->wsumm = $payable->wsumm - $entrance->summ;
            } else {
                $payable->wsumm = $payable->wsumm + $entrance->summ;
            }
            $payable->save();
        }
    }
}
