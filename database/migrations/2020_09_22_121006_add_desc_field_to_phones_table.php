<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDescFieldToPhonesTable extends Migration
{
    public function up()
    {
        Schema::table('phones', function (Blueprint $table) {
            $table->string('desc');
        });
    }

    public function down()
    {
        Schema::table('phones', function (Blueprint $table) {
            $table->dropColumn('desc');
        });
    }
}
