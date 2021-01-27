<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeFieldsArticlesShop extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('sp_name')->nullable()->change();
            $table->string('sp_desc')->nullable()->change();
        });

        \Illuminate\Support\Facades\DB::table('articles')->update([
            'sp_name' => null,
            'sp_desc' => null
        ]);

        \Illuminate\Support\Facades\DB::table('article_store')->update([
            'sp_empty' => 1
        ]);
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('sp_name')->change();
            $table->string('sp_desc')->change();
        });
    }
}
