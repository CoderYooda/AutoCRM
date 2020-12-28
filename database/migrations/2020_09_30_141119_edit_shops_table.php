<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditShopsTable extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->string('domain')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->string('domain')->change();
        });
    }
}
