<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditAdjustmentTable extends Migration
{
    public function up()
    {
        Schema::table('adjustments', function (Blueprint $table) {
            $table->dropColumn('partner_id');
            $table->dropColumn('do_date');
        });
    }

    public function down()
    {
        Schema::table('adjustments', function (Blueprint $table) {
            $table->unsignedBigInteger('partner_id');
            $table->timestamp('do_date');
        });
    }
}
