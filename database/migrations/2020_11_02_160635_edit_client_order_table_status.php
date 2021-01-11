<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditClientOrderTableStatus extends Migration
{
    public function up()
    {
        Schema::table('client_orders', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('client_orders', function (Blueprint $table) {
            $table->integer('status')->default(0);
        });
    }

    public function down()
    {
        Schema::table('client_orders', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('client_orders', function (Blueprint $table) {
            $table->string('status')->nullable();
        });
    }
}
