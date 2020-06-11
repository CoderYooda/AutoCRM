<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalarySchemasPartnerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary_schemas_partner', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('salary_schema_id')->unsigned()->comment('Привязка к схеме выплаты');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к схеме выплаты');
            $table->dateTime('start_period')->nullable()->comment('Начало периода');
            $table->dateTime('end_period')->nullable()->comment('Конец периода');
            $table->bigInteger('value')->unsigned()->comment('Привязка к сотруднику');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salary_schemas_partner');
    }
}
