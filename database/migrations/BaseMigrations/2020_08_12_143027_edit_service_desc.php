<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EditServiceDesc extends Migration
{
    public function up()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('desc');
        });
    }

    public function down()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->text('desc');
        });
    }
}
