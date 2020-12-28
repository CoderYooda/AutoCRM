<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyArticleStoreTable extends Migration
{
    public function up()
    {
        Schema::table('article_store', function (Blueprint $table) {
           $table->decimal('retail_price', 12, 2);
        });
    }

    public function down()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->dropColumn('retail_price');
        });
    }
}
