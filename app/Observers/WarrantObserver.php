<?php

namespace App\Observers;

use App\Models\Statistic;
use App\Models\Warrant;

class WarrantObserver
{
    public function saved(Warrant $warrant)
    {
        $payable = $warrant->payable;
        if($payable){

            if($warrant->isIncoming){
                $payable->wsumm = $payable->wsumm + $warrant->summ;
                //$payable->save();
            } else {
                $payable->wsumm = $payable->wsumm - $warrant->summ;
                //$payable->save();
            }
        }
        if(isset($payable->pays)){
            if(-$payable->wsumm <= 0) {
                $payable->pays = 0;
            } else if(-$payable->wsumm > 0 && $payable->wsumm < $payable->summ){
                $payable->pays = 1;
            } else if(-$payable->wsumm == $payable->summ){
                $payable->pays = 2;
            } else if(-$payable->wsumm > $payable->summ){
                $payable->pays = 3;
            }
        }


        $payable->save();
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
