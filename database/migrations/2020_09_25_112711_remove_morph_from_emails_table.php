<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveMorphFromEmailsTable extends Migration
{
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropColumn('emailable_id');
            $table->dropColumn('emailable_type');
            $table->string('desc')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedBigInteger('emailable_id');
            $table->string('emailable_type');
            $table->string('desc')->change();
        });
    }
}
