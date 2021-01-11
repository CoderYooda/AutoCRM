<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddCompaniesDays extends Migration
{
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->integer('payed_days')->change();
        });

        DB::table('companies')->update(['payed_days' => Carbon::now()->timestamp + (86400 * 14)]);
    }

    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->unsignedInteger('payed_days')->default(0)->change();
        });

        DB::table('companies')->update(['payed_days' => 365]);
    }
}
