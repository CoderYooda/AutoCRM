<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldToCartTable extends Migration
{
    public function up()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->dropColumn('manufacturer');
            $table->dropColumn('article');
            $table->dropColumn('stock');
        });
    }

    public function down()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->string('manufacturer');
            $table->string('article');
            $table->string('stock');
        });
    }
}
