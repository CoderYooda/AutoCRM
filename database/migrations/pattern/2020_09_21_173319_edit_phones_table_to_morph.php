<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditPhonesTableToMorph extends Migration
{
    public function up()
    {
        Schema::table('phones', function (Blueprint $table) {
            $table->unsignedBigInteger('phoneable_id');
            $table->string('phoneable_type');
        });

        foreach(\App\Models\Phone::all() as $phone) {
            $phone->update(['phoneable_type' => \App\Models\Company::class, 'phoneable_id' => 1]);
        }

    }

    public function down()
    {
        Schema::table('phones', function (Blueprint $table) {
            $table->dropColumn('phoneable_id');
            $table->dropColumn('phoneable_type');
        });
    }
}
