<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRefundedCountToEntrancesTable extends Migration
{
    public function up()
    {
        Schema::table('entrances', function (Blueprint $table) {
            $table->integer('refunded_count')->default(0);
        });
    }

    public function down()
    {
        Schema::table('entrances', function (Blueprint $table) {
            $table->dropColumn('refunded_count');
        });
    }
}
