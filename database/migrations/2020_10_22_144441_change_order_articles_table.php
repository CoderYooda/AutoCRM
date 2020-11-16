<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeOrderArticlesTable extends Migration
{
    public function up()
    {
        if(Schema::hasColumn('order_articles', 'article_id')) {

            Schema::table('order_articles', function (Blueprint $table) {
                $table->dropForeign('article_id');
                $table->dropColumn('article_id');
            });
        }

        Schema::table('order_articles', function (Blueprint $table) {
            $table->string('manufacturer');
            $table->string('article');
            $table->string('name');
        });

        Schema::rename('order_articles', 'order_positions');
    }

    public function down()
    {
        if(!Schema::hasColumn('order_articles', 'article_id')) {

            Schema::table('order_articles', function (Blueprint $table) {
                $table->unsignedBigInteger('article_id');
            });
        }

        Schema::table('order_articles', function (Blueprint $table) {
            $table->dropColumn('manufacturer');
            $table->dropColumn('article');
            $table->dropColumn('name');
        });

        Schema::rename('order_positions', 'order_articles');

    }
}
