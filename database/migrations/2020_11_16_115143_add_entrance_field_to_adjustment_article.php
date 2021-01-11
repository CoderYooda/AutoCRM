<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEntranceFieldToAdjustmentArticle extends Migration
{
    public function up()
    {
        Schema::table('article_adjustment', function (Blueprint $table) {
            $table->unsignedBigInteger('article_entrance_id');
        });
    }

    public function down()
    {
        Schema::table('article_adjustment', function (Blueprint $table) {
            $table->dropColumn('article_entrance_id');
        });
    }
}
