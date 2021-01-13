<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNullableToVehicles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->unsignedBigInteger('mark_id')->nullable()->change();
            $table->unsignedBigInteger('model_id')->nullable()->change();
            $table->unsignedBigInteger('modify_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->unsignedBigInteger('mark_id')->change();
            $table->unsignedBigInteger('model_id')->change();
            $table->unsignedBigInteger('modify_id')->change();
        });
    }
}
