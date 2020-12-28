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
        $shipment->freshFoundString();
    }
}
