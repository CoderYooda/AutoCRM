<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClientOrdersFields extends Migration
{

    public function up()
    {
        Schema::table('client_orders', function (Blueprint $table) {
            $table->boolean('isShipped')->default(0);
        });
    }

    public function down()
    {
        Schema::table('client_orders', function (Blueprint $table) {
            $table->dropColumn('isShipped');
        });
    }
}
