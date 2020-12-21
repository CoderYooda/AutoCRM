<?php

namespace App\Observers;

use App\Http\Controllers\System\EvotorQueueController;
use App\Models\Statistic;
use App\Models\Warrant;

class WarrantObserver
{
    public function saved(Warrant $warrant)
    {
        $payable = $warrant->payable;

        EvotorQueueController::pushToQueue($warrant->cashbox_id, $warrant->id);

        if($payable){
            if($warrant->isIncoming){
                $payable->wsumm = $payable->wsumm + $warrant->summ;
            } else {
                $payable->wsumm = $payable->wsumm - $warrant->summ;
            }

            $payable->save();

            $payable->freshWsumm();
        }
    }

    public function deleted(Warrant $warrant)
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
