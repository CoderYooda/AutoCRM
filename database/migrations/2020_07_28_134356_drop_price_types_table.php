<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropPriceTypesTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('price_types');
    }

    public function down()
    {
        Schema::create('price_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('наименование');
            $table->timestamps();
        });
    }
}
