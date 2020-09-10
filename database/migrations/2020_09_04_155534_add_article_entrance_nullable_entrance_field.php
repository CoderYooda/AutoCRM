<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddArticleEntranceNullableEntranceField extends Migration
{
    public function up()
    {
        Schema::table('article_entrance', function (Blueprint $table) {
            $table->unsignedBigInteger('entrance_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('article_entrance', function (Blueprint $table) {
            $table->unsignedBigInteger('entrance_id')->change();
        });
    }
}
