<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPaysFieldToShipments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shipments', function (Blueprint $table) {
            $table->unsignedInteger('pays')->comment('Индикатор оплаты');
        });
        $shipments = \App\Models\Shipment::all();
        foreach ($shipments as $shipment) {

            $status = 0;

            if($shipment->wsumm > 0 && $shipment->wsumm < $shipment->summ){
                $status = 1;
            } else if($shipment->wsumm == $shipment->summ){
                $status = 2;
            } else if($shipment->wsumm > $shipment->summ){
                $status = 3;
            }

            $shipment->pays = $status;
            $shipment->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shipments', function (Blueprint $table) {
            $table->dropColumn('pays');
        });
    }
}
