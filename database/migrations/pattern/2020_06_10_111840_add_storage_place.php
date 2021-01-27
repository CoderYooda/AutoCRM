<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStoragePlace extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('article_store', function (Blueprint $table) {
            $table->string('storage_zone');
            $table->string('storage_rack');
            $table->string('storage_vertical');
            $table->string('storage_horizontal');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function($table) {
            $table->dropColumn('storage_zone');
            $table->dropColumn('storage_rack');
            $table->dropColumn('storage_vertical');
            $table->dropColumn('storage_horizontal');
        });
    }
}
