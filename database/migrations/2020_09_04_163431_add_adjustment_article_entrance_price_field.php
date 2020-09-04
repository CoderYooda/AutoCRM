<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAdjustmentArticleEntrancePriceField extends Migration
{
    public function up()
    {
        Schema::table('adjustment_article_entrance', function (Blueprint $table) {
            $table->decimal('price', 12, 2);
        });
    }

    public function down()
    {
        Schema::table('adjustment_article_entrance', function (Blueprint $table) {
            $table->dropColumn('price');
        });
    }
}
