<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUniqueProductsIndex extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->unique(['company_id', 'article', 'supplier_id']);
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropUnique('articles_company_id_article_supplier_id_unique');
        });
    }
}
