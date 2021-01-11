<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class ClearTables2 extends Migration
{
    public function up()
    {
        DB::table('article_refund')->delete();
        DB::table('entrances')->delete();
    }

    public function down()
    {
        //
    }
}
