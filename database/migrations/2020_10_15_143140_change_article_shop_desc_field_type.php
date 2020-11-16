<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeArticleShopDescFieldType extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->text('sp_desc')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('sp_desc')->nullable()->change();
        });
    }
}
