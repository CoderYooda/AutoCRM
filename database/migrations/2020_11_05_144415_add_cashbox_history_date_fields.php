<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCashboxHistoryDateFields extends Migration
{
    public function up()
    {
        Schema::table('cashbox_history', function (Blueprint $table) {
            $table->dropColumn('date');
        });

        Schema::table('cashbox_history', function (Blueprint $table) {
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('cashbox_history', function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
            $table->string('date');
        });
    }
}
