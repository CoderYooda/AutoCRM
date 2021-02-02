<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReferToCompany extends Migration
{

    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('refer')->nullable()->after('name');
        });
    }

    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('refer');
        });
    }
}
