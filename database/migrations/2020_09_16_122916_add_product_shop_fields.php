<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductShopFields extends Migration
{
    public function up()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->integer('sp_main');
            $table->integer('sp_show_empty');
            $table->integer('sp_stock');
        });
    }

    public function down()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->dropColumn('sp_main');
            $table->dropColumn('sp_show_empty');
            $table->dropColumn('sp_stock');
        });
    }
}
