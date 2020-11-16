<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImageFields extends Migration
{
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->unsignedBigInteger('image_id')->nullable();
            $table->foreign('image_id')->on('images')->references('id')->onDelete('cascade');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->unsignedBigInteger('image_id')->nullable();
            $table->foreign('image_id')->on('images')->references('id')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('image_id');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('image_id');
        });
    }
}
