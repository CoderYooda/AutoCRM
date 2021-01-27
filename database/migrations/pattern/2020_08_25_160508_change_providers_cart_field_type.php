<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeProvidersCartFieldType extends Migration
{
    public function up()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->text('delivery_key')->change();
        });
    }

    public function down()
    {
        Schema::table('providers_cart', function (Blueprint $table) {
            $table->string('delivery_key')->change();
        });
    }
}
