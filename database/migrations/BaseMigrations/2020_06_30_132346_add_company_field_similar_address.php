<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCompanyFieldSimilarAddress extends Migration
{
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->integer('similar_address');
        });
    }

    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('similar_address');
        });
    }
}
