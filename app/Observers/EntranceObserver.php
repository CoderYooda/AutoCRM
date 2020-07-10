<?php

namespace App\Observers;

use App\Models\Entrance;

class EntranceObserver
{
    public function saved(Entrance $entrance)
    {
        $po = $entrance->providerorder()->first();

        //$po->incomes;

        $po->freshIncomes();
    }

    public function deleted(Entrance $entrance)
    {
        $payable = $entrance->payable;
        if($payable){
            if($entrance->isIncoming){
                $payable->wsumm = $payable->wsumm - $entrance->summ;
                $payable->save();
            } else {
                $payable->wsumm = $payable->wsumm + $entrance->summ;
                $payable->save();
            }
        }
    }
}
