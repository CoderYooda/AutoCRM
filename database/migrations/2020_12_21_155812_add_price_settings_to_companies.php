<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPriceSettingsToCompanies extends Migration
{
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedInteger('company_id');

            $table->unique(['name', 'company_id']);
        });

        Schema::create('price_type', function (Blueprint $table) {
            $table->unsignedInteger('price_id');
            $table->decimal('from', 12, 2);
            $table->decimal('to', 12, 2);
            $table->decimal('percent', 12, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('prices');
        Schema::dropIfExists('price_type');
    }
}
