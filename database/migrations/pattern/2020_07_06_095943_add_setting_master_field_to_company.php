<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSettingMasterFieldToCompany extends Migration
{
    public function up()
    {
//        Schema::table('companies', function (Blueprint $table) {
//            $table->boolean('set_master_complite')->default(0);
//        });
    }

    public function down()
    {
//        Schema::table('companies', function (Blueprint $table) {
//            $table->dropColumn('set_master_complite');
//        });
    }
}
