<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditArticleTable extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {

            $table->unsignedBigInteger('fapi_id')->nullable();
//            $table->foreign('manufacture_id')->on('default_autopart_manufactures')->references('id')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('fapi_id');
        });
    }
}
