<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddstatusFieldsToClientOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_orders', function (Blueprint $table) {
            $table->boolean('isComplited')->default(0);
            $table->boolean('isOutcome')->default(0);
            $table->boolean('isPayed')->default(0);
            $table->boolean('isStaffed')->default(0);
            $table->boolean('isFormed')->default(0);
            $table->boolean('isCanceled')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('client_orders', function (Blueprint $table) {
            $table->dropColumn('isComplited')->default(0);
            $table->dropColumn('isOutcome')->default(0);
            $table->dropColumn('isPayed')->default(0);
            $table->dropColumn('isStaffed')->default(0);
            $table->dropColumn('isFormed')->default(0);
            $table->dropColumn('isCanceled')->default(0);
        });
    }
}
