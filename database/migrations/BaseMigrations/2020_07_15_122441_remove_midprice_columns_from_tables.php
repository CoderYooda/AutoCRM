<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveMidpriceColumnsFromTables extends Migration
{
    public function up()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->dropColumn('midprice');
        });

        Schema::table('article_shipment', function (Blueprint $table) {
            $table->dropColumn('midprice');
        });
    }

    public function down()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->decimal('midprice', 12, 2);
        });

        Schema::table('article_shipment', function (Blueprint $table) {
            $table->decimal('midprice', 12, 2);
        });
    }
}
