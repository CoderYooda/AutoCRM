<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeOrderArticlesTable extends Migration
{
    public function up()
    {
        Schema::table('order_articles', function (Blueprint $table) {
            $table->string('manufacturer');
            $table->string('article');
            $table->string('name');

            $table->dropForeign('article_id');
            $table->dropColumn('article_id');
        });
    }

    public function down()
    {
        Schema::table('order_articles', function (Blueprint $table) {
            $table->dropColumn('manufacturer');
            $table->dropColumn('article');
            $table->dropColumn('name');

            $table->unsignedBigInteger('article_id');
        });
    }
}
