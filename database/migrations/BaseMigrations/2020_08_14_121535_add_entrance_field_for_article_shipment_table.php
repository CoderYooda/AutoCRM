<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEntranceFieldForArticleShipmentTable extends Migration
{
    public function up()
    {
        Schema::table('article_shipment', function (Blueprint $table) {
            $table->unsignedBigInteger('entrance_id');
        });
    }

    public function down()
    {
        Schema::table('article_shipment', function (Blueprint $table) {
            $table->dropColumn('entrance_id');
        });
    }
}
