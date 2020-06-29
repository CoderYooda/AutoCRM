<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RequesitesCompaniesTable extends Migration
{
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->integer('is_company');
            $table->string('name');
            $table->string('inn');
            $table->string('kpp');
            $table->string('ogrn');
            $table->string('actual_address');
            $table->string('legal_address');
            $table->string('bank');
            $table->string('cs');
            $table->string('rs');
            $table->string('bik');
        });
    }

    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {

        });
    }
}
