<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHashToSMS extends Migration
{
    public function up()
    {
        Schema::table('sms_confirmation', function (Blueprint $table) {
            $table->string('hash');
        });
    }

    public function down()
    {
        Schema::table('sms_confirmation', function (Blueprint $table) {
            $table->string('hash');
        });
    }
}
