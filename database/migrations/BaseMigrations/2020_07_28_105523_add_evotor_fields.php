<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEvotorFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('warrants', function (Blueprint $table) {
            $table->string('receipt_uuid')->nullable();
            $table->string('payed_at')->nullable();
            $table->string('payed_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('warrants', function (Blueprint $table) {
            $table->dropColumn('receipt_uuid');
            $table->dropColumn('payed_at');
            $table->dropColumn('payed_type');
        });
    }
}
