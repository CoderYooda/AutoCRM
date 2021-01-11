<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDomainFieldsToShop extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->string('domain')->default(null);
            $table->string('subdomain')->default(null);
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('domain');
            $table->dropColumn('subdomain');
        });
    }
}
