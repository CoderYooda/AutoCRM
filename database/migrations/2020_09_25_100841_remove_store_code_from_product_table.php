<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveStoreCodeFromProductTable extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('storeCode');
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->char('storeCode', 255)->nullable();
        });
    }
}
