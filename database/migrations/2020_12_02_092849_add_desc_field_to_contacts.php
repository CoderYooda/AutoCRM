<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDescFieldToContacts extends Migration
{
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->text('contacts_desc');
            $table->dropColumn('work_time_from');
            $table->dropColumn('work_time_to');
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('contacts_desc');
            $table->string('work_time_from')->nullable();
            $table->string('work_time_to')->nullable();
        });
    }
}
