<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveDeprecatedTables extends Migration
{
    public function up()
    {
        Schema::dropIfExists('bans');

        Schema::dropIfExists('client_orders_warrant');
        Schema::dropIfExists('entrance_warrant');
        Schema::dropIfExists('order_warrant');
        Schema::dropIfExists('provider_order_warrant');
        Schema::dropIfExists('refund_warrant');
        Schema::dropIfExists('shipment_warrant');

        Schema::dropIfExists('contract');
        Schema::dropIfExists('contract_types');
    }
}
