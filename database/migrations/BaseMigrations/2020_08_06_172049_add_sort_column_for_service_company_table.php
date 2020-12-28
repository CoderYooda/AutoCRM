<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSortColumnForServiceCompanyTable extends Migration
{
    public function up()
    {
        Schema::table('service_company', function (Blueprint $table) {
            $table->integer('sort');
        });
    }

    public function down()
    {
        Schema::table('service_company', function (Blueprint $table) {
            $table->dropColumn('sort');
        });
    }
}
