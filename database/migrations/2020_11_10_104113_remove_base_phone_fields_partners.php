<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveBasePhoneFieldsPartners extends Migration
{
    public function up()
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->dropColumn('basePhone');
        });
    }

    public function down()
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->string('basePhone')->nullable();
        });
    }
}
