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
        $payable = $warrant->payable;
        if($payable){
            if($warrant->isIncoming){
                $payable->wsumm = $payable->wsumm - $warrant->summ;
                $payable->save();
            } else {
                $payable->wsumm = $payable->wsumm + $warrant->summ;
                $payable->save();
            }
        }
    }
}
