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
            $table->integer('sp_discount_type')->default(0);
            $table->integer('sp_discount_total')->default(0);
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('sp_discount');
            $table->dropColumn('sp_discount_type');
            $table->dropColumn('sp_discount_total');
        });
    }
}
