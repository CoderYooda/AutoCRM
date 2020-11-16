<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveMorphFromImages extends Migration
{
    public function up()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->dropColumn('imageable_id');
            $table->dropColumn('imageable_type');
        });
    }

    public function down()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->unsignedBigInteger('imageable_id');
            $table->string('imageable_type');
        });
    }
}
