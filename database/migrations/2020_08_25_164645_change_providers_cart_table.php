<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeProvidersCartTable extends Migration
{
    public function up()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->dropColumn('delivery_key');
            $table->dropColumn('price');

            $table->text('data');
        });
    }

    public function down()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->text('delivery_key');
            $table->decimal('price', 12, 2);

            $table->dropColumn('data');
        });
    }
}
