<?php

namespace App\Observers;

use App\Models\Shipment;

class ShipmentObserver
{

    public function created(Shipment $shipment)
    {
        //dd(1);
    }

    public function updated(Shipment $shipment)
    {

        //dd($shipment->articles()->count());
//
//        $store = Store::owned()->where('id', $store_id)->first();
//
//        $store->decreaseArticleCount($id, $product['count']);
        //$shipment->inpercents = 100;
        //dd(1);
        //$shipment->save();

    }

    public function deleted(Shipment $shipment)
    {
        //
    }

    public function restored(Shipment $shipment)
    {
        //
    }

    public function forceDeleted(Shipment $shipment)
    {
        //
    }
}
