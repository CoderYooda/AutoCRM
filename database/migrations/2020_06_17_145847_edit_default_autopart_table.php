<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditDefaultAutopartTable extends Migration
{
    public function up()
    {
        Schema::table('default_autopart_manufactures', function (Blueprint $table) {
            $table->dropColumn('id');
        });
    }

    public function down()
    {
        Schema::table('default_autopart_manufactures', function (Blueprint $table) {
            $table->bigIncrements('id');
        });
    }
}
