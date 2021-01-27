<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveSupplierFieldFromShops extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('supplier_id');
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->unsignedBigInteger('supplier_id')->nullable();
        });
    }
}
