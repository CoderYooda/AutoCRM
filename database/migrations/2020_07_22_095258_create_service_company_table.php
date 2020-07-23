<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_company', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id')->on('services')->references('id')->onDelete('cascade');
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->on('companies')->references('id')->onDelete('cascade');
            $table->string('key');
            $table->integer('enabled');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_company');
    }
}
