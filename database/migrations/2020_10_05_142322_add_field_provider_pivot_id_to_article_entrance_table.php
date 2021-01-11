<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldProviderPivotIdToArticleEntranceTable extends Migration
{
    public function up()
    {
        Schema::table('article_entrance', function (Blueprint $table) {
            $table->unsignedBigInteger('provider_pivot_id');
        });
    }

    public function down()
    {
        Schema::table('article_entrance', function (Blueprint $table) {
            $table->dropColumn('provider_pivot_id');
        });
    }
}
