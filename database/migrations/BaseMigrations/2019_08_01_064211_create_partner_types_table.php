<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePartnerTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partner_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('Наименование типа контрагента');
            $table->integer('partner_type_id')->comment('Рекурсия к себе');
            $table->char('type')->comment('Тип контрагента');
            $table->boolean('locked')->comment('Заблокировано от удаления');
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
        Schema::dropIfExists('partner_types');
    }
}
