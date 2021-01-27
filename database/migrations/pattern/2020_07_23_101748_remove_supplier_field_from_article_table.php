<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveSupplierFieldFromArticleTable extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('supplier');
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->char('supplier', 255);
        });
    }
}
