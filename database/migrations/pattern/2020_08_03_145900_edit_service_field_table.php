<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditServiceFieldTable extends Migration
{
    public function up()
    {
        Schema::table('service_field_values', function (Blueprint $table) {
            $table->dropColumn('service_id');
            $table->string('service_key');
        });
    }

    public function down()
    {
        Schema::table('service_field_values', function (Blueprint $table) {
            $table->string('service_id');
            $table->dropColumn('service_key');
        });
    }
}
