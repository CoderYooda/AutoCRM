<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddExistedFieldToProviderCart extends Migration
{
    public function up()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->string('stock');
        });
    }

    public function down()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->dropColumn('stock');
        });
    }
}
