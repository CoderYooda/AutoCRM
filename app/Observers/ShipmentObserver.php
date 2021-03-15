<?php

namespace App\Observers;

use App\Models\Shipment;

class ShipmentObserver
{
    public function creating(Shipment $shipment)
    {
        $shipment->freshFoundString();
    }

    public function updating(Shipment $shipment)
    {
        $shipment->freshFoundString();
    }

    public function saving(Shipment $shipment)
    {
        $status = 0;

        if($shipment->wsumm > 0 && $shipment->wsumm < $shipment->itogo){
            $status = 1;
        } else if($shipment->wsumm == $shipment->itogo){
            $status = 2;
        } else if($shipment->wsumm > $shipment->itogo){
            $status = 3;
        }

        $shipment->pays = $status;

        $shipment->freshFoundString();
    }
}
