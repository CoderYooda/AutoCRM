<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ZeroingArticleStoreCount extends Migration
{
    public function up()
    {
        DB::table('article_store')->update(['count' => 0]);
    }

    public function down()
    {
        //
    }
}
