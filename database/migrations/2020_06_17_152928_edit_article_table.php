<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditArticleTable2 extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->renameColumn('manufacture_id', 'fapi_id');
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->renameColumn('fapi_id', 'manufacture_id');
        });
    }
}
