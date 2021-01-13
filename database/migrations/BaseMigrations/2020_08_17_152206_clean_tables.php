<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CleanTables extends Migration
{
    public function up()
    {
        DB::table('article_shipment')->delete();
        DB::table('article_entrance')->delete();
        DB::table('shipments')->delete();
        DB::table('refund')->delete();

        Schema::dropIfExists('shipment_entrance');
    }

    public function down()
    {
        Schema::create('shipment_entrance', function (Blueprint $table) {
            $table->unsignedBigInteger('shipment_id');
            $table->unsignedBigInteger('entrance_id');
        });
    }
}
