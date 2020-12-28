<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSupplierFieldsToShopsTable extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->integer('supplier_offers');
            $table->integer('supplier_percent');
            $table->unsignedBigInteger('supplier_id');
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('supplier_offers');
            $table->dropColumn('supplier_percent');
            $table->dropColumn('supplier_id');
        });
    }
}
