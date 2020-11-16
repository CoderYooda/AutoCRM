<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDiscountShopFieldsToArticles extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->decimal('sp_discount', 12, 2)->default(0);
            $table->decimal('sp_discount_price', 12, 2)->default(0);
            $table->integer('sp_discount_type')->default(0);
            $table->integer('sp_discount_total')->default(0);

            $table->integer('sp_main')->default(0);
            $table->integer('sp_stock')->default(0);
        });

        Schema::table('article_store', function (Blueprint $table) {
            $table->dropColumn('sp_empty');
            $table->dropColumn('sp_main');
            $table->dropColumn('sp_stock');
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('sp_discount');
            $table->dropColumn('sp_discount_price');
            $table->dropColumn('sp_discount_type');
            $table->dropColumn('sp_discount_total');

            $table->dropColumn('sp_main');
            $table->dropColumn('sp_stock');
        });

        Schema::table('article_store', function (Blueprint $table) {
            $table->integer('sp_empty')->default(0);
            $table->integer('sp_main')->default(0);
            $table->integer('sp_stock')->default(0);
        });
    }
}
