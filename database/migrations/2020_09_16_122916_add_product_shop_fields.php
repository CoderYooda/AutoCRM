<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductShopFields extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('sp_name');
            $table->string('sp_desc');
        });

        Schema::table('article_store', function (Blueprint $table) {
            $table->integer('sp_main');
            $table->integer('sp_empty');
            $table->integer('sp_stock');
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('sp_name');
            $table->dropColumn('sp_desc');
        });

        Schema::table('article_store', function (Blueprint $table) {
            $table->dropColumn('sp_main');
            $table->dropColumn('sp_empty');
            $table->dropColumn('sp_stock');
        });
    }
}
