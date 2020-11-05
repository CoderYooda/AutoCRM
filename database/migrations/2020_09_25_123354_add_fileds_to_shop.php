<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFiledsToShop extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->integer('show_empty')->nullable();
            $table->integer('show_amount')->nullable();
            $table->integer('storage_days')->nullable();
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('show_empty');
            $table->dropColumn('show_amount');
            $table->dropColumn('storage_days');
        });
    }
}
