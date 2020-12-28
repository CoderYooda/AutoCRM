<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveCountFieldFromArticleStoreTable extends Migration
{
    public function up()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->dropColumn('count');
            $table->dropColumn('reserved');
        });
    }

    public function down()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->integer('count');
            $table->integer('reserved');
        });
    }
}
